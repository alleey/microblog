package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class TopicCreatedEvent extends BaseEvent<Long> {
    public TopicCreatedEvent(Object source, @NotNull Long topicId) {
        super(source, topicId);
    }
}