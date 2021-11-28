package org.zabardast.resources.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class ResourceDeletedEvent extends BaseEvent {
    public ResourceDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}