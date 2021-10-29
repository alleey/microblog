package org.zabardast.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.server.core.Relation;
import org.zabardast.stats.model.CounterStatistics;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Relation(collectionRelation = "statistics")
public class CounterStatisticsResponseRepresentation {
    private String counter;
    private CounterStatistics statistics;
}
