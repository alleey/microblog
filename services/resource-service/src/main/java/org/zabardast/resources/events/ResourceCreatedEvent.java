package org.zabardast.resources.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class ResourceCreatedEvent extends BaseEvent {
    public ResourceCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}