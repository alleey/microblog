package org.zabardast.stats.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zabardast.common.events.EventPublisher;
import org.zabardast.stats.events.LocalEventPublishser;

@Configuration
public class EventsConfig {
    @Bean
    public EventPublisher eventsPublihser() {
        return new LocalEventPublishser();
    }
}
