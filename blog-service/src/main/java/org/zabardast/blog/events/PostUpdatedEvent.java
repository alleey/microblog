package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Post;
import org.zabardast.common.events.BaseEvent;

public class PostUpdatedEvent extends BaseEvent<Post> {
    public PostUpdatedEvent(Object source, @NotNull Post data) {
        super(source, data);
    }
    public PostUpdatedEvent(@NotNull Post data) {
        super(data);
    }
}