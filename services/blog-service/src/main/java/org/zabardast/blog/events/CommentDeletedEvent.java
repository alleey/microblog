package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class CommentDeletedEvent extends BaseEvent {
    public CommentDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}