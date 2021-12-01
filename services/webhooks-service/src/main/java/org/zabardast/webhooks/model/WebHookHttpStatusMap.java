package org.zabardast.webhooks.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
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
public class WebHookHttpStatusMap {

    @Id
    @Column(name = "webhook_id", nullable = false)
    private Long webhookId;

    @Id
    @Column(name = "http_status_code", nullable = false)
    private Integer httpStatusCode;

    @Column(name = "action", nullable = false)
    private Integer action;
}
