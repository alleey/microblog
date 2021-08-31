package org.zabardast.stats;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.zabardast.stats.dto.CounterResponseRepresentation;
import org.zabardast.stats.model.Counter;

public final class MockStatsData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public MockStatsData() {

    }

    public static CounterResponseRepresentation createCounterResponse(String id, String owner, double value) {
        return CounterResponseRepresentation.builder()
                .counter(id)
                .owner(owner)
                .value(value)
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
