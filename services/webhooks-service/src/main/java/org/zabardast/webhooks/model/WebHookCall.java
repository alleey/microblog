package org.zabardast.webhooks.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "webhook_http_status_maps", schema="webhooksservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class WebHookCall {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private WebHookCallStatus status;

    @Column(name = "attempts", nullable = false)
    private Integer attempts;

    @Lob
    @Column(name = "payload", nullable = false)
    private String payload;

    @Column(name = "first_attempt_ts", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date firstAttemptTs;

    @Column(name = "last_attempt_ts", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastAttemptTs;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "id")
    private WebHook webHook;
}
