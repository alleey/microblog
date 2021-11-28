package org.zabardast.bookmarks.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class BookmarkDeletedEvent extends BaseEvent {
    public BookmarkDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}