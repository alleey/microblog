package org.zabardast.webhooks.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "webhook_http_headers", schema="webhooksservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class WebHookHttpHeader {

    @EmbeddedId
    private WebHookHttpHeaderKey key;

    @Column(name = "value_spel", nullable = false)
    private String valueSpel;

    @MapsId("webhookId")
    @JoinColumn(name = "webhook_id", referencedColumnName = "id")
    @ManyToOne
    private WebHook webHook;
}
