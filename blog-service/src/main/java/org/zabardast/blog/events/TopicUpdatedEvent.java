package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.blog.model.Topic;
import org.zabardast.common.events.BaseEvent;

public class TopicUpdatedEvent extends BaseEvent<Topic> {
    public TopicUpdatedEvent(Object source, @NotNull Topic data) {
        super(source, data);
    }
    public TopicUpdatedEvent(@NotNull Topic data) {
        super(data);
    }
}