package org.zabardast.userprofile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import org.zabardast.userprofile.dto.UserProfileResponseRepresentation;
import org.zabardast.userprofile.model.UserProfile;

public final class MockUserProfileData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public final List<UserProfileResponseRepresentation> AllUserProfiles;
    public final List<UserProfileResponseRepresentation> AlLNonAdminProfiles;
    public final List<UserProfileResponseRepresentation> AllAdminUserProfiles;

    public MockUserProfileData() {

        AlLNonAdminProfiles =
                Stream.concat(
                    Stream.of(createUserProfileResponse(UserIdGuest, "Guest")),
                    IntStream.range(0, 20).mapToObj(i -> createUserProfileResponse(String.format("User%d",i), String.format("User%d",i)))
                ).collect(Collectors.toList());

        AllAdminUserProfiles = Stream.of(UserIdAdmin)
                .map(i -> createUserProfileResponse(i, "Admin"))
                .collect(Collectors.toList());

        AllUserProfiles = Stream.concat(AlLNonAdminProfiles.stream(), AllAdminUserProfiles.stream())
                .collect(Collectors.toList());
    }

    public static UserProfileResponseRepresentation createUserProfileResponse(String id, String userName) {
        return UserProfileResponseRepresentation.builder()
                .id(id)
                .username(userName)
                .createdOn(new Date())
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
