package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class TopicDeletedEvent extends BaseEvent {
    public TopicDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}