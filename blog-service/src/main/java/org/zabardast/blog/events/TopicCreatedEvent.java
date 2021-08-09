package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Topic;
import org.zabardast.common.events.BaseEvent;

public class TopicCreatedEvent extends BaseEvent<Topic> {
    public TopicCreatedEvent(Object source, @NotNull Topic data) {
        super(source, data);
    }
    public TopicCreatedEvent(@NotNull Topic data) { super(data); }
}