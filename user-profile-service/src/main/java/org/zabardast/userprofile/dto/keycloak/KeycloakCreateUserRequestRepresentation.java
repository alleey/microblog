package org.zabardast.userprofile.dto.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class KeycloakCreateUserRequestRepresentation {
    String id;
    String username;
    String firstName;
    String lastName;
    boolean enabled;
    boolean emailVerified;
    boolean totp;
    String email;
    KeycloakPasswordCredentialsRepresentation credentials;
}
