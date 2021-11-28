package org.zabardast.bookmarks.events.listeners;

import java.util.Map;
import java.util.function.Consumer;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.bookmarks.model.Event;
import org.zabardast.bookmarks.services.BookmarkService;
import org.zabardast.common.domain.DomainConstants;
import org.zabardast.common.utils.JsonUtils;

@Slf4j
@Component
public class UserProfileDomainEventsListener {

    public static final String DOMAIN_EVENT_USERPROFILE_DELETED = "org.zabardast.userprofile.events.UserProfileDeletedEvent";
    public static final String ATTR_USER_ID = "userId";

    @Autowired
    BookmarkService bookmarkService;

    @Bean
    public Consumer<Message<Event>> userProfileEvents() {
        return event -> {
            final String eventName = (String)event.getHeaders().get(DomainConstants.HEADER_EVENT);
            log.info("Received domain event " + eventName);

            if(eventName.compareTo(DOMAIN_EVENT_USERPROFILE_DELETED) == 0) {

                Map attributes = JsonUtils.fromJson(event.getPayload().getPayload());
                String userId = attributes.getOrDefault(ATTR_USER_ID, "").toString();

                if(Strings.isNotBlank(userId)) {
                    handleUserProfileDeletion(userId);
                }
            }
        };
    }

    void handleUserProfileDeletion(String userId) {

        log.info("handleUserProfileDeletion " + userId);
        Page<BookmarkResponseRepresentation> bookmarks = bookmarkService.getAllBookmarks(userId, Pageable.unpaged());
        for (BookmarkResponseRepresentation bookmark: bookmarks) {
            bookmarkService.deleteBookmark(bookmark.getId());
            log.info("Deleted orphaned bookmark " + bookmark.getId());
        }
    }
}
