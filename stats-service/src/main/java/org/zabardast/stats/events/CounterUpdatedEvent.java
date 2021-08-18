package org.zabardast.stats.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.stats.model.Counter;

public class CounterUpdatedEvent extends BaseEvent<Counter> {
    public CounterUpdatedEvent(Object source, @NotNull Counter data) {
        super(source, data);
    }
    public CounterUpdatedEvent(@NotNull Counter data) { super(data); }
}