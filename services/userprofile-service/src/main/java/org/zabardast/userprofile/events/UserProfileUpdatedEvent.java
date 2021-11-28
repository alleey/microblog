package org.zabardast.userprofile.events;

import java.util.Map;
import lombok.ToString;
import org.zabardast.common.events.BaseEvent;

@ToString
public class UserProfileUpdatedEvent extends BaseEvent {
    public UserProfileUpdatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}