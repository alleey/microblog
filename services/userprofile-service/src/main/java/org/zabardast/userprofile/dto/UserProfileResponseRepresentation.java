package org.zabardast.userprofile.dto;

import java.util.Comparator;
import java.util.Date;
import java.util.Objects;
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
public class UserProfileResponseRepresentation implements Comparable<UserProfileRequestRepresentation> {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    String about;
    private Date createdOn;

    static Comparator<String> nullSafeStringComparator = Comparator.nullsFirst(String::compareTo);

    @Override
    public int compareTo(UserProfileRequestRepresentation o) {
        int res = Objects.compare(this.id, o.getId(), nullSafeStringComparator);
        if(res == 0)
            res = Objects.compare(this.username, o.getUsername(), nullSafeStringComparator);
        if(res == 0)
            res = Objects.compare(this.firstName, o.getFirstName(), nullSafeStringComparator);
        if(res == 0)
            res = Objects.compare(this.lastName, o.getLastName(), nullSafeStringComparator);
        if(res == 0)
            res = Objects.compare(this.email, o.getEmail(), nullSafeStringComparator);
        return 0;
    }
}
