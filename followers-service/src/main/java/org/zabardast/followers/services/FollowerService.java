package org.zabardast.followers.services;

import java.util.Date;
import javax.persistence.EntityManager;
import javax.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.common.filtering.FilterPredicateConverter;
import org.zabardast.followers.dto.FollowerResponseRepresentation;
import org.zabardast.followers.events.FollowerCreatedEvent;
import org.zabardast.followers.events.FollowerDeletedEvent;
import org.zabardast.followers.model.Follower;
import org.zabardast.followers.model.FollowerKey;
import org.zabardast.followers.repository.FollowerRepository;

@Service
public class FollowerService
{
    @Autowired
    EventPublisher eventPublisher;

    @Autowired
    EntityManager entityManager;

    @Autowired
    FilterPredicateConverter filterPredicateConverter;

    @Autowired
    private FollowerRepository followerRepository;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public Page<String> getAllFollowers(@NotNull String ownerId, @NotNull Pageable pageable) {
        return followerRepository.findAllById(ownerId, pageable).map((f -> f.getFollower()));
    }

    @Transactional
    public Page<String> getAllFollowing(@NotNull String ownerId, @NotNull Pageable pageable) {
        return followerRepository.findAllByFollower(ownerId, pageable).map((f -> f.getId()));
    }

    @Transactional
    public FollowerResponseRepresentation addFollower(@NotNull String ownerId, @NotNull String followerId) {
        Follower follower = Follower.builder()
                .id(ownerId)
                .follower(followerId)
                .createdOn(new Date())
                .build();
        Follower saved = followerRepository.save(follower);
        eventPublisher.publishEvent(new FollowerCreatedEvent(this, saved));
        return modelMapper.map(saved, FollowerResponseRepresentation.class);
    }

    @Transactional
    public void removeFollower(@NotNull String ownerId, @NotNull String followerId) {
        FollowerKey key = new FollowerKey(ownerId, followerId);
        if(followerRepository.existsById(key)) {
            followerRepository.deleteById(key);
            eventPublisher.publishEvent(new FollowerDeletedEvent(this, key));
        }
    }
}
