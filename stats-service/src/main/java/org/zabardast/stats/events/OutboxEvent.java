package org.zabardast.stats.events;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

public class OutboxEvent extends ApplicationEvent {
    @Getter
    @Setter
    private int batchSize = 1;

    public OutboxEvent(Object source) {
        super(source);
    }
    public OutboxEvent(Object source, int batchSize) {
        super(source);
        this.batchSize = batchSize;
    }
}
