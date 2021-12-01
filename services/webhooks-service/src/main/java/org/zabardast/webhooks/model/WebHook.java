package org.zabardast.webhooks.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "webhooks", schema="webhooksservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class WebHook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "priority", nullable = false)
    private long priority;

    @Column(name = "display_name", nullable = true)
    private String displayName;

    @Column(name = "url", nullable = false)
    private String url;

    @Lob
    @Column(name = "condition_spel", nullable = false)
    private String conditionSpel;

    @Column(name = "relay_auth_header", nullable = false)
    private Boolean relayAuthHeader;

    @Column(name = "max_attempts", nullable = false)
    private Integer maxAttempts;

    @Column(name = "max_retries_per_attempt", nullable = false)
    private Integer maxRetriesPerAttempt;

    @Column(name = "attempt_interval", nullable = false)
    private Integer attemptInterval;

    @Column(name = "http_verb", nullable = false)
    private String httpVerb;

    @Column(name = "http_user", nullable = true)
    private String httpUser;

    @Column(name = "http_pass", nullable = true)
    private String httpPass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_handler_id")
    private EventHandler eventHandler;

    @OneToMany(mappedBy = "webHook", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    List<WebHookHttpHeader> extraHeaders;

    @OneToOne(fetch = FetchType.LAZY, cascade =  CascadeType.ALL, mappedBy = "webHook")
    @PrimaryKeyJoinColumn
    private WebHookCall webHookCall;
}
