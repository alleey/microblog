package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class PostUpdatedEvent extends BaseEvent {
    public PostUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}