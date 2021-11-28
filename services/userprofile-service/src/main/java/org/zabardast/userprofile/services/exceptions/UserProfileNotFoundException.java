package org.zabardast.userprofile.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class UserProfileNotFoundException extends NotFoundException {
    public UserProfileNotFoundException(String userProfileId) {
        super(String.format("Could not find user profile %s", userProfileId));
    }
}