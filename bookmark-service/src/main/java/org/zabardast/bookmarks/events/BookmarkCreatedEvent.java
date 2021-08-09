package org.zabardast.bookmarks.events;

import javax.validation.constraints.NotNull;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.common.events.BaseEvent;

public class BookmarkCreatedEvent extends BaseEvent<Bookmark> {
    public BookmarkCreatedEvent(Object source, @NotNull Bookmark data) {
        super(source, data);
    }
    public BookmarkCreatedEvent(@NotNull Bookmark data) { super(data); }
}