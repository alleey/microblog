package org.zabardast.followers.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@IdClass(FollowingKey.class)
@Table(name = "followers", schema="followers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Following implements Serializable {
    @Id
    @Column(name = "user_id", nullable = false)
    String user;

    @Id
    @Column(name = "followed_by_id", nullable = false)
    String followedBy;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "full", column = @Column(name = "user_name"))
    })
    private Name userName;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "full", column = @Column(name = "followed_by_name"))
    })
    private Name followedByName;

    @Column(name = "created_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
}