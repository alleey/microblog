package org.zabardast.userprofile.dto.keycloak;

import java.util.List;
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
public class KeycloakUserRepresentation {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    boolean enabled;
}
