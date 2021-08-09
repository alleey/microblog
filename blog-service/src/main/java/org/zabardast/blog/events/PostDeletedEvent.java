package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Post;
import org.zabardast.common.events.BaseEvent;

public class PostDeletedEvent extends BaseEvent<Long> {
    public PostDeletedEvent(Object source, @NotNull Long data) {
        super(source, data);
    }
    public PostDeletedEvent(@NotNull Long data) {
        super(data);
    }
}