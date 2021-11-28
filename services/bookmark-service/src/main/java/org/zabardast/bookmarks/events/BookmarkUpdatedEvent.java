package org.zabardast.bookmarks.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class BookmarkUpdatedEvent extends BaseEvent {
    public BookmarkUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}