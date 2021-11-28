package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class CommentCreatedEvent extends BaseEvent {
    public CommentCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}