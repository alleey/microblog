package org.zabardast.userprofile.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.userprofile.model.UserProfile;

public class UserProfileUpdatedEvent extends BaseEvent<UserProfile> {
    public UserProfileUpdatedEvent(Object source, @NotNull UserProfile data) {
        super(source, data);
    }
    public UserProfileUpdatedEvent(@NotNull UserProfile data) { super(data); }
}