package org.zabardast.blog.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class PostDeletedEvent extends BaseEvent {
    public PostDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}