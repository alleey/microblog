package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class CommentUpdatedEvent extends BaseEvent {
    public CommentUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}