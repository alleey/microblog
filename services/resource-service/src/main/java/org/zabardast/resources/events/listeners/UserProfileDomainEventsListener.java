package org.zabardast.resources.events.listeners;

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
import org.zabardast.common.domain.DomainConstants;
import org.zabardast.common.utils.JsonUtils;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.Event;
import org.zabardast.resources.model.ResourceKey;
import org.zabardast.resources.services.ResourceManagerService;

@Slf4j
@Component
public class UserProfileDomainEventsListener {

    public static final String DOMAIN_EVENT_USERPROFILE_DELETED = "org.zabardast.userprofile.events.UserProfileDeletedEvent";
    public static final String ATTR_USER_ID = "userId";

    @Autowired
    ResourceManagerService resourceManagerService;

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
        Page<ResourceResponseRepresentation> resources = resourceManagerService.findByOwner(userId, Pageable.unpaged());
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
