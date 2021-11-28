package org.zabardast.resources.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class ResourceUpdatedEvent extends BaseEvent {
    public ResourceUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}