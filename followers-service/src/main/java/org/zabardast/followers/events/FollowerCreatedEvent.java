package org.zabardast.followers.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.followers.model.Follower;

public class FollowerCreatedEvent extends BaseEvent<Follower> {
    public FollowerCreatedEvent(Object source, @NotNull Follower data) {
        super(source, data);
    }
    public FollowerCreatedEvent(@NotNull Follower data) { super(data); }
}