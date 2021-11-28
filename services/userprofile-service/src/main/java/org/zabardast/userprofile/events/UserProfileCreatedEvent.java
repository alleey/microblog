package org.zabardast.userprofile.events;

import java.util.Map;
import lombok.ToString;
import org.zabardast.common.events.BaseEvent;

@ToString
public class UserProfileCreatedEvent extends BaseEvent {
    public UserProfileCreatedEvent(Object source, Map<String, Object> data) {
        super(source, data);
    }
}