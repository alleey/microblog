package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Comment;
import org.zabardast.common.events.BaseEvent;

public class CommentCreatedEvent extends BaseEvent<Comment> {
    public CommentCreatedEvent(Object source, @NotNull Comment data) {
        super(source, data);
    }
    public CommentCreatedEvent(@NotNull Comment data) { super(data); }
}