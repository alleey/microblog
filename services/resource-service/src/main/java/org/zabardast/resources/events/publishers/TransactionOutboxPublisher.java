package org.zabardast.resources.events.publishers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.zabardast.resources.events.EventFactory;
import org.zabardast.resources.model.Event;
import org.zabardast.resources.events.OutboxEvent;
import org.zabardast.resources.repository.EventRepository;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.services.ServiceSecurityContextProvider;

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
