package org.zabardast.userprofile.events;

import javax.validation.constraints.NotNull;
import lombok.ToString;
import org.zabardast.common.events.BaseEvent;
import org.zabardast.userprofile.model.UserProfile;

@ToString
public class UserProfileDeletedEvent extends BaseEvent<String> {
    public UserProfileDeletedEvent(Object source, @NotNull String userprofileId) { super(source, userprofileId); }
}