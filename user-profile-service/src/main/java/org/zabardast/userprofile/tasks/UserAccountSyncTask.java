package org.zabardast.userprofile.tasks;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.zabardast.userprofile.dto.keycloak.KeycloakUserRepresentation;
import org.zabardast.userprofile.dto.UserProfileRequestRepresentation;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;
import org.zabardast.userprofile.services.KeycloakService;
import org.zabardast.userprofile.services.UserProfileService;
import org.zabardast.userprofile.services.exceptions.UserProfileNotFoundException;

@Slf4j
@Component
@Profile("!test")
public class UserAccountSyncTask {

    @Autowired
    KeycloakService keycloakService;

    @Autowired
    UserProfileService userProfileService;

    @Autowired
    ModelMapper modelMapper;

    @Value("${service.tasks.userprofilessync.batchSize}")
    int batchSize;

    @Scheduled(fixedDelayString = "${service.tasks.userprofilessync.fixedDelay}")
    public void syncKeycloakUsers() {

        long now = System.currentTimeMillis() / 1000;
        log.info("Started keycloak user account sync process - {}", LocalDate.now());

        int usercount = keycloakService.usersCount();
        int processed = 0;

        userProfileService.setSyncOnForAllUserProfiles(null);

        log.info("Found {} users", usercount);
        while(processed < usercount)
        {
            List<KeycloakUserRepresentation> users = keycloakService.users(processed, batchSize);
            users.forEach(u -> updateLocalProfile(u));
            processed += users.size();

            log.info("Processed {} users", processed, usercount);
        }

        deleteOrphanedProfiles();

        log.info("Finished keycloak user account sync process - {}", LocalDate.now());
    }

    void updateLocalProfile(@NotNull  KeycloakUserRepresentation keycloakUserRepresentation) {
        UserProfileRequestRepresentation userProfile = modelMapper.map(keycloakUserRepresentation, UserProfileRequestRepresentation.class);
        try {
            UserProfileResponseRepresentation savedProfile = userProfileService
                    .getUserProfile(keycloakUserRepresentation.getId());

            log.info("Keycloak user profile: " + keycloakUserRepresentation);
            log.info("Saved profile: " + savedProfile);

            if(savedProfile.compareTo(userProfile) != 0) {
                // Only update when data has changed, ensuring frivolous domain events arent generated
                userProfileService.updateUserProfile(keycloakUserRepresentation.getId(), userProfile, true);
            } else {
                userProfileService.setSyncOnForUserProfiles(keycloakUserRepresentation.getId());
            }
        } catch (UserProfileNotFoundException e) {
            log.info("Creating new user profile {}", keycloakUserRepresentation.getId());
            userProfileService.newUserProfile(userProfile);
        }
    }

    void deleteOrphanedProfiles() {
        userProfileService.getAllUnsyncedProfiles().forEach(
            userProfile -> {
                log.info("Deleting orphaned user profile {}", userProfile.getId());
                userProfileService.deleteUserProfile(userProfile.getId());
            }
        );
    }
}
