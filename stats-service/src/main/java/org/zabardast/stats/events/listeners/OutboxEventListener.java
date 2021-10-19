package org.zabardast.stats.events.listeners;

import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.common.events.publishers.EventPublisher;
import org.zabardast.stats.model.Event;
import org.zabardast.stats.model.OutboxEvent;
import org.zabardast.stats.repository.EventRepository;

@Slf4j
@Component
public class OutboxEventListener {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    @Qualifier("domainEventPublisher")
    EventPublisher<Event> domainEventPublisher;

    @Async
    @EventListener()
    void handleOutboxEvent(OutboxEvent event)
    {
        long now = System.currentTimeMillis() / 1000;
        int processed = 0;
        while(processed < event.getBatchSize())
        {
            processOneEvent();
            processed ++;
        }
    }

    @Transactional
    void processOneEvent() {
        Optional<Event> evt = eventRepository.findTopByOrderByIdAsc();
        if(!evt.isPresent()) {
            return;
        }
        domainEventPublisher.publishEvent(evt.get());
        eventRepository.deleteById(evt.get().getId());
    }
}
