package org.zabardast.userprofile.events.publishers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.common.services.ServiceSecurityContextProvider;
import org.zabardast.userprofile.model.Event;
import org.zabardast.userprofile.model.OutboxEvent;
import org.zabardast.userprofile.repository.EventRepository;

@Slf4j
@Component
public class TransactionOutboxPublisher implements EventPublisher<BaseEvent> {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    ServiceSecurityContextProvider serviceSecurityContextProvider;

    @Autowired
    EventRepository eventRepository;

    @Override
    public void publishEvent(BaseEvent event) {

        if(event.getPrincipal() == null)
            event.setPrincipal(serviceSecurityContextProvider.getPrincipalName());
        Event entity = Event.builder()
                .instant(new Date())
                .name(event.getClass().getName())
                .principal(event.getPrincipal())
                .build();
        ObjectMapper objectMapper = new ObjectMapper();
        try
        {
            String serialized = objectMapper.writeValueAsString(event.getData());
            entity.setPayload(serialized);
            eventRepository.save(entity);
            applicationEventPublisher.publishEvent(new OutboxEvent(this));
        }
        catch (JsonProcessingException e)
        {
            log.error(e.toString());
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}
