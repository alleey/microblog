package org.zabardast.stats.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class CounterUpdatedEvent extends BaseEvent {
    public CounterUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}