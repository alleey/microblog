package org.zabardast.userprofile.events;

import javax.validation.constraints.NotNull;
import org.zabardast.common.events.BaseEvent;

public class UserProfileDeletedEvent extends BaseEvent<String> {
    public UserProfileDeletedEvent(Object source, @NotNull String data) {
        super(source, data);
    }
    public UserProfileDeletedEvent(@NotNull String data) {
        super(data);
    }
}