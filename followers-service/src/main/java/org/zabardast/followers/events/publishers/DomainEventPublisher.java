package org.zabardast.followers.events.publishers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.followers.model.Event;

@Slf4j
@Component
public class DomainEventPublisher implements EventPublisher<Event> {

    @Autowired
    private StreamBridge streamBridge;

    @Override
    public void publishEvent(Event event) {
        log.info(event.toString());
        streamBridge.send("producer-out-0",
            MessageBuilder.withPayload(event)
            .setHeader("Event", event.getName())
            .build()
        );
    }
}
