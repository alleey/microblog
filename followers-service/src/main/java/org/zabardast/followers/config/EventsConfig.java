package org.zabardast.followers.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.followers.events.LocalEventPublishser;

@Configuration
public class EventsConfig {
    @Bean
    public EventPublisher eventsPublihser() {
        return new LocalEventPublishser();
    }
}
