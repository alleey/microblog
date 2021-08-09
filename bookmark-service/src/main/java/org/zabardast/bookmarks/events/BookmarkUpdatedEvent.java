package org.zabardast.bookmarks.events;

import javax.validation.constraints.NotNull;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.common.events.BaseEvent;

public class BookmarkUpdatedEvent extends BaseEvent<Bookmark> {
    public BookmarkUpdatedEvent(Object source, @NotNull Bookmark data) {
        super(source, data);
    }
    public BookmarkUpdatedEvent(@NotNull Bookmark data) { super(data); }
}