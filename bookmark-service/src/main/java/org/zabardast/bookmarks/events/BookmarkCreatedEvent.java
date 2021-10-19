package org.zabardast.bookmarks.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class BookmarkCreatedEvent extends BaseEvent<Long> {
    public BookmarkCreatedEvent(Object source, @NotNull Long bookmarkId) {
        super(source, bookmarkId);
    }
}