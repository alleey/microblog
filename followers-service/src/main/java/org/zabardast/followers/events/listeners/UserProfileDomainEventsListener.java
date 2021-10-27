package org.zabardast.followers.events.listeners;

import java.util.function.Consumer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.domain.DomainConstants;
import org.zabardast.followers.dto.FollowResponseRepresentation;
import org.zabardast.followers.model.Event;
import org.zabardast.followers.services.FollowingService;

@Slf4j
@Component
public class UserProfileDomainEventsListener {

    public static final String DOMAIN_EVENT_USERPROFILE_DELETED = "org.zabardast.userprofile.events.UserProfileDeletedEvent";

    @Autowired
    FollowingService followingService;

    @Bean
    public Consumer<Message<Event>> userProfileEvents() {
        return event -> {
            final String eventName = (String)event.getHeaders().get(DomainConstants.HEADER_EVENT);
            log.info("Received domain event " + eventName);

            if(eventName.compareTo(DOMAIN_EVENT_USERPROFILE_DELETED) == 0)
            {
                String userId = event.getPayload().getPayload();
                handleUserProfileDeletion(userId);
            }
        };
    }

    void handleUserProfileDeletion(String userId) {

        Page<FollowResponseRepresentation> followings = followingService.listFollowers(userId, Pageable.unpaged());
        for (FollowResponseRepresentation following: followings)
        {
            followingService.unfollow(following.getFollowerId(), following.getUserId());
            log.info("Deleted orphaned follower " + following.getFollowerId() + " of " + following.getUserId());
        }

        followings = followingService.listFollowing(userId, Pageable.unpaged());
        for (FollowResponseRepresentation following: followings)
        {
            followingService.unfollow(following.getFollowerId(), following.getUserId());
            log.info("Deleted orphaned follower " + following.getFollowerId() + " of " + following.getUserId());
        }
    }
}
