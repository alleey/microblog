package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class PostCreatedEvent extends BaseEvent {
    public PostCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}
