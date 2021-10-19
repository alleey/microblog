package org.zabardast.stats.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.stats.model.CounterKey;

public class CounterDeletedEvent extends BaseEvent<CounterKey> {
    public CounterDeletedEvent(Object source, @NotNull CounterKey data) {
        super(source, data);
    }
}