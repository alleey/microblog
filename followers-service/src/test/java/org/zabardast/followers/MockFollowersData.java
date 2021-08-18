package org.zabardast.followers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import org.zabardast.followers.model.Follower;

public final class MockFollowersData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public final List<String> AllGuestFollowers;
    public final List<String> AllGuestFollowing;

    public MockFollowersData() {

        AllGuestFollowers =
                Arrays.asList(UserIdAdmin, UserIdService);

        AllGuestFollowing =
                Arrays.asList(UserIdAdmin);

    }


    public static Follower createFollower(String id, String follower) {
        return Follower.builder()
                .id(id)
                .follower(follower)
                .createdOn(new Date())
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
