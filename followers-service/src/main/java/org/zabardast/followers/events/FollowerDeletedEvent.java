package org.zabardast.followers.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.followers.model.FollowerKey;

public class FollowerDeletedEvent extends BaseEvent<FollowerKey> {
    public FollowerDeletedEvent(Object source, @NotNull FollowerKey data) {
        super(source, data);
    }
    public FollowerDeletedEvent(@NotNull FollowerKey data) {
        super(data);
    }
}