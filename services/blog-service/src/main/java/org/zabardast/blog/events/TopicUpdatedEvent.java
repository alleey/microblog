package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class TopicUpdatedEvent extends BaseEvent<Long> {
    public TopicUpdatedEvent(Object source, @NotNull Long topicId) {
        super(source, topicId);
    }
}