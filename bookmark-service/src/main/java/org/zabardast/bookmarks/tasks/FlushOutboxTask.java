package org.zabardast.bookmarks.tasks;

import java.time.LocalDate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.zabardast.bookmarks.model.OutboxEvent;

@Slf4j
@Component
@Profile("!test")
public class FlushOutboxTask {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    @Value("${service.tasks.flushoutbox.batchSize}")
    int batchSize;

    @Scheduled(fixedDelayString = "${service.tasks.flushoutbox.fixedDelay}")
    public void triggerOutboxFlush() {
        long now = System.currentTimeMillis() / 1000;
        log.info("Trigger peridic outbox flush - {}", LocalDate.now());
        applicationEventPublisher.publishEvent(new OutboxEvent(this, batchSize));
    }
}
