package org.zabardast.followers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.zabardast.followers.dto.FollowResponseRepresentation;

public final class MockFollowersData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public final List<FollowResponseRepresentation> AllGuestFollowers;
    public final List<FollowResponseRepresentation> AllGuestFollowing;

    public MockFollowersData() {

        AllGuestFollowers =
                Arrays.asList(UserIdAdmin, UserIdService).stream()
                        .map(i -> createFollowsResponse(i, UserIdGuest))
                        .collect(Collectors.toList());

        AllGuestFollowing =
                Arrays.asList(UserIdAdmin).stream()
                        .map(i -> createFollowsResponse(i, UserIdGuest))
                        .collect(Collectors.toList());

    }

    public static FollowResponseRepresentation createFollowsResponse(String id, String follower) {
        return FollowResponseRepresentation.builder()
                .userId(id)
                .followerId(follower)
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
