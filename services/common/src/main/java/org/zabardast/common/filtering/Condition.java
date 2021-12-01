package org.zabardast.common.filtering;

import java.util.List;
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
public class Condition implements AbstractFilter {
    String attribute;
    Operator operator = Operator.EQ;
    String value;
    List<String> values;
}
