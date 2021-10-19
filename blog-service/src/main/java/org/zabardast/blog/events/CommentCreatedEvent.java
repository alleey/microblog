package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class CommentCreatedEvent extends BaseEvent<Long> {
    public CommentCreatedEvent(Object source, @NotNull Long commentId) {
        super(source, commentId);
    }
}