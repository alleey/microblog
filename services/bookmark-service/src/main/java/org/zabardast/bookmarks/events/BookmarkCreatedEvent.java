package org.zabardast.bookmarks.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class BookmarkCreatedEvent extends BaseEvent {
    public BookmarkCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}