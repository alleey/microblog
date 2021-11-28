package org.zabardast.followers.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "events", schema="followersservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@ToString
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private long sequence;

    @Column(name = "instant", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date instant;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "principal", nullable = true)
    private String principal;

    @Column(name = "traceId", nullable = true)
    private String traceId;

    @Lob
    @Column(name = "payload", nullable = false)
    private String payload;
}
