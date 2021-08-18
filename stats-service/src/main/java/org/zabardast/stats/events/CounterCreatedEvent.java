package org.zabardast.stats.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.stats.model.Counter;

public class CounterCreatedEvent extends BaseEvent<Counter> {
    public CounterCreatedEvent(Object source, @NotNull Counter data) {
        super(source, data);
    }
    public CounterCreatedEvent(@NotNull Counter data) { super(data); }
}