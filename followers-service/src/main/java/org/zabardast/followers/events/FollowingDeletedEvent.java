package org.zabardast.followers.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.followers.model.FollowingKey;

public class FollowingDeletedEvent extends BaseEvent<FollowingKey> {
    public FollowingDeletedEvent(Object source, @NotNull FollowingKey data) {
        super(source, data);
    }
    public FollowingDeletedEvent(@NotNull FollowingKey data) {
        super(data);
    }
}