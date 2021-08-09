package org.zabardast.userprofile.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class UserProfileNotFoundException extends ResourceNotFoundException {
    public UserProfileNotFoundException(String userProfileId) {
        super(String.format("Could not find user profile %s", userProfileId));
    }
}