package org.zabardast.followers.events.publishers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.followers.events.EventFactory;
import org.zabardast.followers.events.OutboxEvent;
import org.zabardast.followers.repository.EventRepository;

@Slf4j
@Component
public class TransactionOutboxPublisher implements EventPublisher<BaseEvent> {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    EventFactory eventFactory;

    @Override
    public void publishEvent(BaseEvent event) {

        try
        {
            eventRepository.save(eventFactory.domainEvent(event));
            // Notify the listener to act asap
            applicationEventPublisher.publishEvent(new OutboxEvent(this));
        }
        catch (Exception e)
        {
            log.error(e.toString());
            throw e;
        }
    }
}
