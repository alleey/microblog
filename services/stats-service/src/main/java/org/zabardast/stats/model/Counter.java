package org.zabardast.stats.model;

import java.util.Date;
import javax.persistence.Column;
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
@IdClass(CounterKey.class)
@Table(name = "counters", schema="statsservice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Counter {

    public static final String AnonymousOwner = "00000000-0000-0000-0000-000000000000";

    @Id
    @Column(name = "counter_id", nullable = false)
    String counter;

    @Id
    @Column(name = "owner_id", nullable = false)
    String owner;

    @Column(name = "value", nullable = true)
    private Double value;

    @Column(name = "created_on", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
}
