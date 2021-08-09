package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Comment;
import org.zabardast.common.events.BaseEvent;

public class CommentUpdatedEvent extends BaseEvent<Comment> {
    public CommentUpdatedEvent(Object source, @NotNull Comment data) {
        super(source, data);
    }
    public CommentUpdatedEvent(@NotNull Comment data) {
        super(data);
    }
}