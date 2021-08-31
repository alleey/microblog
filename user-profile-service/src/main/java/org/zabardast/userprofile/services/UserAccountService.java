package org.zabardast.userprofile.services;

import java.net.URI;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zabardast.userprofile.dto.RegisterRequestRepresentation;
import org.zabardast.userprofile.dto.keycloak.KeycloakCreateUserRequestRepresentation;
import org.zabardast.userprofile.dto.keycloak.KeycloakPasswordCredentialsRepresentation;

@Service
public class UserAccountService
{
    @Autowired
    private KeycloakService keycloakService;

    @Transactional
    public String register(@NotNull RegisterRequestRepresentation requestRepresentation) {
        KeycloakCreateUserRequestRepresentation request = KeycloakCreateUserRequestRepresentation.builder()
                .username(requestRepresentation.getUsername())
                .firstName(requestRepresentation.getFirstName())
                .lastName(requestRepresentation.getLastName())
                .email(requestRepresentation.getEmail())
                .credentials(
                    KeycloakPasswordCredentialsRepresentation.builder()
                        .value(requestRepresentation.getPassword())
                        .temporary(false)
                        .build()
                )
                .emailVerified(true)
                .enabled(true)
                .totp(false)
                .build();
        ResponseEntity<?> response = keycloakService.create(request);
        if(response.getStatusCode() == HttpStatus.CREATED) {
            URI link = response.getHeaders().getLocation();
            return link.toString();
        }

        throw new RuntimeException("Error registering user");
    }

    @Transactional
    public void unregister(@NotNull String userId) {
        ResponseEntity<?> response = keycloakService.delete(userId);
    }
}
