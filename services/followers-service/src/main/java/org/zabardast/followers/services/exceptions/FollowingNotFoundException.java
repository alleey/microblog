package org.zabardast.followers.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class FollowingNotFoundException extends NotFoundException {
    public FollowingNotFoundException(String userId, String followerId) {
        super(String.format("Could not find following record %s, %s", userId, followerId));
    }
}