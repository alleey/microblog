package org.zabardast.webhooks.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "event_handlers", schema="webhooksservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class EventHandler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @OneToMany(mappedBy = "eventHandler", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    List<EventTransformation> eventTransformations;

    @OneToMany(mappedBy = "eventHandler", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    List<WebHook> webHooks;
}

