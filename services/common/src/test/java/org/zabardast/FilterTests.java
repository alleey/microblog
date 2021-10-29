package org.zabardast;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import org.zabardast.common.filtering.Condition;
import org.zabardast.common.filtering.Filter;
import org.zabardast.common.filtering.FilterType;
import org.zabardast.common.filtering.Operator;

@SpringBootTest(classes = FilterTests.class)
public class FilterTests {

    @Test
    void testSerialization() throws Exception {

        Filter filter = Filter.builder().type(FilterType.AND)
                .conditions(Arrays.asList(
                        Condition.builder().attribute("a").operator(Operator.EQ).value("1").build(),
                        Condition.builder().attribute("b").operator(Operator.EQ).value("1").build()
                )).build();
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(filter);

        Assert.hasText(
                "{\"type\":\"AND\",\"conditions\":[{\"attribute\":\"a\",\"operator\":\"EQ\",\"value\":\"1\",\"values\":null},{\"attribute\":\"b\",\"operator\":\"EQ\",\"value\":\"1\",\"values\":null}]}",
                "serialization");
    }

    @Test
    void testDeserialization() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS);
        Filter value = objectMapper.readValue("{\"type\":\"and\",\"conditions\":[{\"attribute\":\"a\",\"operator\":\"eq\",\"value\":\"1\",\"values\":null},{\"attribute\":\"b\",\"operator\":\"EQ\",\"value\":\"1\",\"values\":null}]}",
                Filter.class);

        Assert.notNull(value, "deserialization");
    }
}
