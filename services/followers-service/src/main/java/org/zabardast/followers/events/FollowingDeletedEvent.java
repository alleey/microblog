package org.zabardast.followers.events;

import java.util.Map;
import org.zabardast.common.events.BaseEvent;

public class FollowingDeletedEvent extends BaseEvent {
    public FollowingDeletedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}