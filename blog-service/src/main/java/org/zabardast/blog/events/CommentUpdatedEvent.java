package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class CommentUpdatedEvent extends BaseEvent<Long> {
    public CommentUpdatedEvent(Object source, @NotNull Long commentId) {
        super(source, commentId);
    }
}