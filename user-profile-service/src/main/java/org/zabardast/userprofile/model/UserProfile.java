package org.zabardast.userprofile.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.server.core.Relation;

@Entity
@Table(name = "userprofiles", schema="userprofiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Relation(collectionRelation = "userprofiles")
public class UserProfile {
    @Id
    @Column(name = "user_id", nullable = false)
    String id;

    @Column(name = "username", nullable = false)
    String username;

    String firstName;

    String lastName;

    String email;

    boolean enabled;

    @Column(name = "created_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;

    @Column(name = "synced_on", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date syncedOn;
}
