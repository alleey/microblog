package org.zabardast.bookmarks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import org.zabardast.bookmarks.dto.BookmarkRequestRepresentation;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.bookmarks.model.Bookmark;

public final class MockBookmarkData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public final List<BookmarkResponseRepresentation> AllBookmarks;
    public final List<BookmarkResponseRepresentation> AlLUserBookmarks;
    public final List<BookmarkResponseRepresentation> AllAdminBookmarks;

    public MockBookmarkData() {

        AlLUserBookmarks = IntStream.range(0, 15)
                .mapToObj(i -> createBookmarkResponse(i, String.format("Bookmark %s",i), "http://www.google.com", UserIdGuest))
                .collect(Collectors.toList());
        AllAdminBookmarks = IntStream.range(0, 10)
                .mapToObj(i -> createBookmarkResponse(i+15, String.format("Bookmark %s",i), "http://www.microsoft.com", UserIdAdmin))
                .collect(Collectors.toList());
        AllBookmarks = Stream.concat(AlLUserBookmarks.stream(), AllAdminBookmarks.stream())
                .collect(Collectors.toList());
    }


    public static BookmarkRequestRepresentation createBookmarkRequest(long id, String caption, String url, String userId) {
        return BookmarkRequestRepresentation.builder()
                .caption(caption)
                .url(url)
                .build();
    }

    public static BookmarkResponseRepresentation createBookmarkResponse(long id, String caption, String url, String userId) {
        return BookmarkResponseRepresentation.builder()
                .id(id)
                .caption(caption)
                .url(url)
                .owner(userId)
                .createdOn(new Date())
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
