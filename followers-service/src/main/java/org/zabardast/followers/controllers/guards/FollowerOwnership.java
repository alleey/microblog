package org.zabardast.followers.controllers.guards;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class FollowerOwnership {
    public boolean require(String userId, Authentication authentication) {
        return userId.equalsIgnoreCase(authentication.getName());
    }
}
