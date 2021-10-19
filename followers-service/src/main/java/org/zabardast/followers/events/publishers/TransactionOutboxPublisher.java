package org.zabardast.followers.events.publishers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.followers.model.Event;
import org.zabardast.followers.model.OutboxEvent;
import org.zabardast.followers.repository.EventRepository;

@Slf4j
@Component
public class TransactionOutboxPublisher implements EventPublisher<BaseEvent> {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    EventRepository eventRepository;

    @Override
    public void publishEvent(BaseEvent event) {
        Event entity = Event.builder()
                .instant(new Date())
                .name(event.getClass().getName())
                .principal(event.getPrincipal())
                .build();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String serialized = objectMapper.writeValueAsString(event.getData());
            entity.setPayload(serialized);
            eventRepository.save(entity);
        }
        catch (JsonProcessingException e)
        {
            log.error(e.toString());
            throw new RuntimeException(e.getMessage(), e);
        }
        applicationEventPublisher.publishEvent(new OutboxEvent(this));
    }
}
