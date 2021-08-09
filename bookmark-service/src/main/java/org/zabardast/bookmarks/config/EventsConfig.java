package org.zabardast.bookmarks.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zabardast.bookmarks.events.LocalEventPublishser;
import org.zabardast.common.events.EventPublisher;

@Configuration
public class EventsConfig {
    @Bean
    public EventPublisher eventsPublihser() {
        return new LocalEventPublishser();
    }
}
