package org.zabardast.resources.events.listeners;

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
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.Event;
import org.zabardast.resources.model.ResourceKey;
import org.zabardast.resources.services.ResourceManagerService;

@Slf4j
@Component
public class BlogDomainEventsListener {

    public static final String DOMAIN_EVENT_BLOGPOST_DELETED = "org.zabardast.blog.events.PostDeletedEvent";

    @Autowired
    ResourceManagerService resourceManagerService;

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

        log.info("handleBlogPostDeletion " + postId);
        String postResource = String.format("posts-{0}", postId);
        Page<ResourceResponseRepresentation> resources = resourceManagerService
                .findByResource(postResource, Pageable.unpaged());

        for (ResourceResponseRepresentation res: resources) {
            ResourceKey rkey = ResourceKey.builder()
                    .resource(res.getResource())
                    .key(res.getKey())
                    .build();
            resourceManagerService.deleteResource(res.getKey(), res.getResource());
            log.info("Deleted orphaned res " + rkey);
        }
    }
}
