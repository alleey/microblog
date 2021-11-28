package org.zabardast.userprofile.dto;

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
public class UserProfileRequestRepresentation {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    String about;
}
