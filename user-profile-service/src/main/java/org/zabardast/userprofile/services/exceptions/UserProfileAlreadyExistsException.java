package org.zabardast.userprofile.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceAlreadyExistsException;
import org.zabardast.userprofile.model.UserProfile;

public class UserProfileAlreadyExistsException extends ResourceAlreadyExistsException {
    public UserProfileAlreadyExistsException(UserProfile userProfile) {
        super(String.format("UserProfile already exists %s", userProfile.getId()));
    }
}