package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class TopicCreatedEvent extends BaseEvent {
    public TopicCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}