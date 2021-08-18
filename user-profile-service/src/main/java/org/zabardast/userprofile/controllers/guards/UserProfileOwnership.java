package org.zabardast.userprofile.controllers.guards;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;
import org.zabardast.userprofile.model.UserProfile;
import org.zabardast.userprofile.services.UserProfileService;
import org.zabardast.userprofile.services.exceptions.UserProfileNotFoundException;

@Slf4j
@Component
public class UserProfileOwnership {
    @Autowired
    UserProfileService userProfileService;

    public boolean require(String userProfileId, Authentication authentication) {
        UserProfileResponseRepresentation userProfile = userProfileService.getUserProfile(userProfileId);
        if(userProfile == null)
            throw new UserProfileNotFoundException(userProfileId);
        return userProfile.getId().equalsIgnoreCase(authentication.getName());
    }
}
