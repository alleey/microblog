package org.zabardast.userprofile.services;

import java.util.Collection;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.userprofile.dto.UserProfileRequestRepresentation;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;
import org.zabardast.userprofile.events.UserProfileCreatedEvent;
import org.zabardast.userprofile.events.UserProfileDeletedEvent;
import org.zabardast.userprofile.events.UserProfileUpdatedEvent;
import org.zabardast.userprofile.model.UserProfile;
import org.zabardast.userprofile.repository.UserProfileRepository;
import org.zabardast.userprofile.services.exceptions.UserProfileNotFoundException;

@Service
public class UserProfileService
{
    @Autowired
    @Qualifier("transactionOutboxPublisher")
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public UserProfileResponseRepresentation getUserProfile(@NotNull String userProfileId) {
        UserProfile bookmark = userProfileRepository
                .findById(userProfileId)
                .orElseThrow(() -> new UserProfileNotFoundException(userProfileId));
        return modelMapper.map(bookmark, UserProfileResponseRepresentation.class);
    }

    @Transactional
    public Page<UserProfileResponseRepresentation> getAllUserProfiles(@NotNull Pageable pageable) {
        return userProfileRepository
                .findAll(pageable)
                .map(i -> modelMapper.map(i, UserProfileResponseRepresentation.class));
    }

    @Transactional
    public Collection<UserProfile> getAllUnsyncedProfiles() {
        return userProfileRepository.findBySyncedOnIsNull();
    }

    @Transactional
    public Page<UserProfileResponseRepresentation> getAllFiltered(@NotNull Filter criteria, @NotNull Pageable pageable) {

        CriteriaQuery<UserProfile> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                UserProfile.class,
                criteria,
                pageable.getSort());
        TypedQuery<UserProfile> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<UserProfile> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, UserProfileResponseRepresentation.class));
    }

    @Transactional
    public UserProfileResponseRepresentation newUserProfile(@NotNull UserProfileRequestRepresentation userProfileRequestRepresentation)
    {
        UserProfile userProfile = modelMapper.map(userProfileRequestRepresentation, UserProfile.class);
        userProfile.setCreatedOn(new Date());
        userProfile.setSyncedOn(userProfile.getCreatedOn());

        UserProfile saved = userProfileRepository.save(userProfile);
        eventPublisher.publishEvent(
            new UserProfileCreatedEvent(this, saved.getId())
        );
        return modelMapper.map(saved, UserProfileResponseRepresentation.class);
    }

    @Transactional
    public UserProfileResponseRepresentation updateUserProfile(@NotNull String userProfileId,
                                                               @NotNull UserProfileRequestRepresentation userProfile,
                                                               boolean setSync)
    {
        return userProfileRepository.findById(userProfileId)
            .map(found -> {
                found.setUsername(userProfile.getUsername());
                found.setFirstName(userProfile.getFirstName());
                found.setLastName(userProfile.getLastName());
                found.setEmail(userProfile.getEmail());
                if(setSync)
                    found.setSyncedOn(new Date());

                UserProfile saved =  userProfileRepository.save(found);
                eventPublisher.publishEvent(
                    new UserProfileUpdatedEvent(this, saved.getId())
                );
                return modelMapper.map(saved, UserProfileResponseRepresentation.class);
            })
            .orElseThrow(() -> {
                throw new UserProfileNotFoundException(userProfileId);
            });
    }

    @Transactional
    public void deleteUserProfile(@NotNull String userProfileId) {
        if(userProfileRepository.existsById(userProfileId)) {
            userProfileRepository.deleteById(userProfileId);
            eventPublisher.publishEvent(
                new UserProfileDeletedEvent(this, userProfileId)
            );
        }
    }

    @Transactional
    public void setSyncOnForUserProfiles(@NotNull String userProfileId) {
        userProfileRepository.findById(userProfileId).ifPresent(found -> {
            found.setSyncedOn(new Date());
            userProfileRepository.save(found);
        });
    }

    @Transactional
    public void setSyncOnForAllUserProfiles(Date timestamp) {
        userProfileRepository.setSyncOnAll(timestamp);
    }
}
