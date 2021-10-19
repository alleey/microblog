package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Post;
import org.zabardast.common.events.BaseEvent;

public class PostCreatedEvent extends BaseEvent<Long> {
    public PostCreatedEvent(Object source, @NotNull Long postId) {
        super(source, postId);
    }
}
