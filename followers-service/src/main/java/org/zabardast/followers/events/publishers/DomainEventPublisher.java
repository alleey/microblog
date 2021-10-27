package org.zabardast.followers.events.publishers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.zabardast.common.domain.DomainConstants;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.followers.model.Event;

@Slf4j
@Component
public class DomainEventPublisher implements EventPublisher<Event> {

    @Value("${domain.events.bindingName:domainEvents-out-0}")
    String destination;

    @Value("${spring.application.name:followers-service}")
    String serviceName;

    @Autowired
    private StreamBridge streamBridge;

    @Override
    public void publishEvent(Event event) {
        log.info(event.toString());
        streamBridge.send(this.destination, MessageBuilder.withPayload(event)
                .setHeader(DomainConstants.HEADER_SERVICE, serviceName)
                .setHeader(DomainConstants.HEADER_EVENT, event.getName())
                .build()
        );
    }
}
