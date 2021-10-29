package org.zabardast.userprofile.events;

import javax.validation.constraints.NotNull;
import lombok.ToString;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.userprofile.model.UserProfile;

@ToString
public class UserProfileCreatedEvent extends BaseEvent<String> {
    public UserProfileCreatedEvent(Object source, @NotNull String userprofileId) { super(source, userprofileId); }
}