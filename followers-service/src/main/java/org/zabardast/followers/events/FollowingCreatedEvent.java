package org.zabardast.followers.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.followers.model.Following;

public class FollowingCreatedEvent extends BaseEvent<Following> {
    public FollowingCreatedEvent(Object source, @NotNull Following data, String principal) {
        super(source, data, principal);
    }
}