package org.zabardast.bookmarks.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class BookmarkDeletedEvent extends BaseEvent<Long> {
    public BookmarkDeletedEvent(Object source, @NotNull Long data) {
        super(source, data);
    }
    public BookmarkDeletedEvent(@NotNull Long data) {
        super(data);
    }
}