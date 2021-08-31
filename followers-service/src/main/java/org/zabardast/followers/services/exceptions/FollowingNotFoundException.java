package org.zabardast.followers.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class FollowingNotFoundException extends ResourceNotFoundException {
    public FollowingNotFoundException(String userId, String followedBy) {
        super(String.format("Could not find following record %s, %s", userId, followedBy));
    }
}