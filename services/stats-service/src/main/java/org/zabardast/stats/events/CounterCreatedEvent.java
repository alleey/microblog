package org.zabardast.stats.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class CounterCreatedEvent extends BaseEvent {
    public CounterCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}