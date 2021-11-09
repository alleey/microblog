package org.zabardast.resources.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@IdClass(ResourceKey.class)
@Table(name = "resources", schema="resourceservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Resource {

    public static final String AnonymousOwner = "00000000-0000-0000-0000-000000000000";

    @Id
    @Column(name = "resource_id", nullable = false)
    String resource;

    @Id
    @Column(name = "key", nullable = false)
    String key;

    @Column(name = "owner_id", nullable = false)
    String owner;

    @Column(name = "content_type", nullable = false)
    String contentType;

    @Column(name = "content_location", nullable = false)
    String contentLocation;

    @Column(name = "created_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;

    @Column(name = "updated_on", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedOn;
}
