package org.zabardast.userprofile.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.userprofile.model.UserProfile;

public class UserProfileCreatedEvent extends BaseEvent<UserProfile> {
    public UserProfileCreatedEvent(Object source, @NotNull UserProfile data) {
        super(source, data);
    }
    public UserProfileCreatedEvent(@NotNull UserProfile data) { super(data); }
}