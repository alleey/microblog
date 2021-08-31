package org.zabardast.followers.services;

import java.util.Arrays;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.common.filtering.Operator;
import org.zabardast.followers.dto.FollowRequestRepresentation;
import org.zabardast.followers.dto.FollowResponseRepresentation;
import org.zabardast.followers.events.FollowingCreatedEvent;
import org.zabardast.followers.events.FollowingDeletedEvent;
import org.zabardast.followers.model.Following;
import org.zabardast.followers.model.FollowingKey;
import org.zabardast.followers.model.Name;
import org.zabardast.followers.repository.FollowingRepository;
import org.zabardast.followers.services.exceptions.FollowingNotFoundException;

@Service
public class FollowingService
{
    @Autowired
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    private FollowingRepository followingRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public FollowResponseRepresentation listOne(@NotNull String userId, @NotNull String followedById) {
        FollowingKey key = new FollowingKey(userId, followedById);
        return followingRepository
                .findById(key)
                .map(i -> modelMapper.map(i, FollowResponseRepresentation.class))
                .orElseThrow(() -> new FollowingNotFoundException(userId, followedById));
    }

    @Transactional
    public Page<FollowResponseRepresentation> listFollowedBy(@NotNull String userId, @NotNull Pageable pageable) {
        return followingRepository
                .findAllByUser(userId, pageable)
                .map(i -> modelMapper.map(i, FollowResponseRepresentation.class));
    }

    @Transactional
    public Page<FollowResponseRepresentation> listFollowing(@NotNull String userId, @NotNull Pageable pageable) {
        return followingRepository
                .findAllByFollowedBy(userId, pageable)
                .map(i -> modelMapper.map(i, FollowResponseRepresentation.class));
    }

    @Transactional
    public Page<FollowResponseRepresentation> findFollowedBy(
            @NotNull String userId,
            @NotNull Filter criteria,
            @NotNull Pageable pageable)
    {
        CriteriaQuery<Following> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Following.class,
                Filter.builder().conditions(Arrays.asList(
                    // Filter all records where userId is following
                    Condition.builder().attribute("user").operator(Operator.EQ).value(userId).build(),
                    criteria
                )).build(),
                pageable.getSort());
        TypedQuery<Following> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Following> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, FollowResponseRepresentation.class));
    }

    @Transactional
    public Page<FollowResponseRepresentation> findFollowing(
            @NotNull String userId,
            @NotNull Filter criteria,
            @NotNull Pageable pageable)
    {
        CriteriaQuery<Following> criteriaQuery = filterPredicateConverter.buildCriteriaQuery(entityManager,
                Following.class,
                Filter.builder().conditions(Arrays.asList(
                    // Filter all records where userId is followed
                    Condition.builder().attribute("followedBy").operator(Operator.EQ).value(userId).build(),
                    criteria
                )).build(),
                pageable.getSort());
        TypedQuery<Following> query = entityManager.createQuery(criteriaQuery);

        int totalRows = query.getResultList().size();
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        Page<Following> result = new PageImpl<>(query.getResultList(), pageable, totalRows);
        return result.map(i -> modelMapper.map(i, FollowResponseRepresentation.class));
    }

    // Make the user identitied by {userId} follow the user identified by {followRequest}
    @Transactional
    public FollowResponseRepresentation follow(@NotNull String userId,
                                               @NotNull FollowRequestRepresentation followRequest)
    {
        Following following = Following.builder()
                .user(followRequest.getUserId())
                .userName(new Name(followRequest.getUserName()))
                .followedBy(userId)
                .followedByName(new Name(followRequest.getFollowedByName()))
                .createdOn(new Date())
                .build();
        Following saved = followingRepository.save(following);
        eventPublisher.publishEvent(new FollowingCreatedEvent(this, saved));
        return modelMapper.map(saved, FollowResponseRepresentation.class);
    }

    // Make the user identitied by {userId} unfollow the user identified by {followedId}
    @Transactional
    public void unfollow(@NotNull String userId, @NotNull String followedId) {
        FollowingKey key = new FollowingKey(followedId, userId);
        if(followingRepository.existsById(key)) {
            followingRepository.deleteById(key);
            eventPublisher.publishEvent(new FollowingDeletedEvent(this, key));
        }
    }
}
