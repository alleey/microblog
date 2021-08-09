package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Post;
import org.zabardast.common.events.BaseEvent;

public class PostCreatedEvent extends BaseEvent<Post> {
    public PostCreatedEvent(Object source, @NotNull Post data) {
        super(source, data);
    }
    public PostCreatedEvent(@NotNull Post data) { super(data); }
}