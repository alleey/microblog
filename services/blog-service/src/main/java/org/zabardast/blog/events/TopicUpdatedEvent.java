package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class TopicUpdatedEvent extends BaseEvent {
    public TopicUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}