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
import org.zabardast.userprofile.dto.KeycloakUserRepresentation;
import org.zabardast.userprofile.dto.UserProfileRepresentation;
import org.zabardast.userprofile.model.UserProfile;
import org.zabardast.userprofile.services.UserProfileService;
import org.zabardast.userprofile.services.exceptions.UserProfileNotFoundException;

@Slf4j
@Component
@Profile("!test")
public class UserAccountSyncTask {

    @Autowired
    KeycloakClient keycloakClient;

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

        int usercount = keycloakClient.usersCount();
        int processed = 0;

        userProfileService.setSyncOnForAllUserProfiles(null);

        log.info("Found {} users", usercount);
        while(processed < usercount)
        {
            List<KeycloakUserRepresentation> users = keycloakClient.users(processed, batchSize);
            users.forEach(u -> updateLocalProfile(u));
            processed += users.size();

            log.info("Processed {} users", processed, usercount);
        }

        deleteOrphanedProfiles();

        log.info("Finished keycloak user account sync process - {}", LocalDate.now());
    }

    void updateLocalProfile(@NotNull  KeycloakUserRepresentation keycloakUserRepresentation) {
        UserProfileRepresentation userProfile = modelMapper.map(keycloakUserRepresentation, UserProfileRepresentation.class);
        try {
            userProfileService.updateUserProfile(keycloakUserRepresentation.getId(), userProfile, true);
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
