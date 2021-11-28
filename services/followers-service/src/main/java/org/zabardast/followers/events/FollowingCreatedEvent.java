package org.zabardast.followers.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class FollowingCreatedEvent extends BaseEvent {
    public FollowingCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}