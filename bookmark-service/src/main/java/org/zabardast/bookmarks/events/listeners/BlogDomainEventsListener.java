package org.zabardast.bookmarks.events.listeners;

import java.util.Arrays;
import java.util.function.Consumer;
import lombok.extern.slf4j.Slf4j;
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
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.Operator;

@Slf4j
@Component
public class BlogDomainEventsListener {

    public static final String DOMAIN_EVENT_BLOGPOST_DELETED = "org.zabardast.blog.events.PostDeletedEvent";

    @Autowired
    BookmarkService bookmarkService;

    @Bean
    public Consumer<Message<Event>> blogEvents() {
        return event -> {
            final String eventName = (String)event.getHeaders().get(DomainConstants.HEADER_EVENT);
            log.info("Received domain event " + eventName);

            if(eventName.compareTo(DOMAIN_EVENT_BLOGPOST_DELETED) == 0)
            {
                Long postId = Long.parseLong(event.getPayload().getPayload());
                handleBlogPostDeletion(postId);
            }
        };
    }

    @Transactional
    void handleBlogPostDeletion(Long postId) {

        String postCountersExpr = String.format("/posts/{0}/", postId);
        Filter filter = Filter.builder().conditions(
            Arrays.asList(Condition.builder().attribute("url").operator(Operator.LIKE).value(postCountersExpr).build())
        ).build();
        Page<BookmarkResponseRepresentation> bookmarks = bookmarkService.findAllFiltered(filter, Pageable.unpaged());
        for (BookmarkResponseRepresentation bookmark: bookmarks)
        {
            bookmarkService.deleteBookmark(bookmark.getId());
            log.info("Deleted orphaned bookmark " + bookmark.getId());
        }

    }
}
