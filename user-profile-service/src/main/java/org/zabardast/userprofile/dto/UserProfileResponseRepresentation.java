package org.zabardast.userprofile.dto;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.server.core.Relation;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Relation(collectionRelation = "userprofiles")
public class UserProfileResponseRepresentation {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    boolean enabled;
    private Date createdOn;
}
