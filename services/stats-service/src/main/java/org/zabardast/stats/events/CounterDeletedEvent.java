package org.zabardast.stats.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class CounterDeletedEvent extends BaseEvent {
    public CounterDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}