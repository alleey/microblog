package org.zabardast.resources.events.listeners;

import java.util.function.Consumer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.Event;
import org.zabardast.resources.services.ResourceService;
import org.zabardast.common.domain.DomainConstants;

@Slf4j
@Component
public class UserProfileDomainEventsListener {

    public static final String DOMAIN_EVENT_USERPROFILE_DELETED = "org.zabardast.userprofile.events.UserProfileDeletedEvent";

    @Autowired
    ResourceService resourceService;

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

        log.info("handleUserProfileDeletion " + userId);
//        Page<ResourceResponseRepresentation> bookmarks = resourceService.getAllBookmarks(userId, Pageable.unpaged());
//        for (ResourceResponseRepresentation bookmark: bookmarks) {
//            resourceService.deleteBookmark(bookmark.getId());
//            log.info("Deleted orphaned bookmark " + bookmark.getId());
//        }
    }
}
