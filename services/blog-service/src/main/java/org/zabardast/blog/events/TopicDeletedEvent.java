package org.zabardast.blog.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class TopicDeletedEvent extends BaseEvent<Long> {
    public TopicDeletedEvent(Object source, @NotNull Long topicId) {
        super(source, topicId);
    }
}