package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class CommentDeletedEvent extends BaseEvent<Long> {
    public CommentDeletedEvent(Object source, @NotNull Long commentId) {
        super(source, commentId);
    }
}