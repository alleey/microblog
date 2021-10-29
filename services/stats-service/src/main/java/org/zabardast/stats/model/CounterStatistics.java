package org.zabardast.stats.model;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CounterStatistics implements Serializable {
    Long count;
    Double min;
    Double max;
    Double sum;
    Double avg;
}
