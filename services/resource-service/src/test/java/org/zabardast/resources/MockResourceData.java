package org.zabardast.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import org.zabardast.resources.dto.ResourceRequestRepresentation;
import org.zabardast.resources.dto.ResourceResponseRepresentation;

public final class MockResourceData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public final List<ResourceResponseRepresentation> AllResources;
    public final List<ResourceResponseRepresentation> AlLUserResources;
    public final List<ResourceResponseRepresentation> AllAdminResources;

    public MockResourceData() {

        AlLUserResources = new ArrayList<>();
        AllAdminResources = new ArrayList<>();
        AllResources = new ArrayList<>();
    }


    public static ResourceRequestRepresentation createResourceRequest(String contentType) {
        return ResourceRequestRepresentation.builder()
                .contentType(contentType)
                .build();
    }

    public static ResourceResponseRepresentation createResourceResponse(String key,
                                                                        String resource,
                                                                        String userId,
                                                                        String contentType) {
        return ResourceResponseRepresentation.builder()
                .key(key)
                .resource(resource)
                .owner(userId)
                .contentType(contentType)
                .createdOn(new Date())
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
