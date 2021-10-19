package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Post;
import org.zabardast.common.events.BaseEvent;

public class PostUpdatedEvent extends BaseEvent<Long> {
    public PostUpdatedEvent(Object source, @NotNull Long postId) {
        super(source, postId);
    }
}