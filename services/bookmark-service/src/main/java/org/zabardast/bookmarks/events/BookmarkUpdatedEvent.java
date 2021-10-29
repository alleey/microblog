package org.zabardast.bookmarks.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class BookmarkUpdatedEvent extends BaseEvent<Long> {
    public BookmarkUpdatedEvent(Object source, @NotNull Long bookmarkId) {
        super(source, bookmarkId);
    }
}