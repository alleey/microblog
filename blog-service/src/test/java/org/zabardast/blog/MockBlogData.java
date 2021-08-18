package org.zabardast.blog;

import org.zabardast.blog.dto.CommentRequestRepresentation;
import org.zabardast.blog.dto.CommentResponseRepresentation;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.slugify.Slugify;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public final class MockBlogData {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public static final String[] TopicNames = {
        "General", "Politics", "Religion", "Philosophy", "Science", "Sports", "Technology",
        "Cooking", "Gardening", "Programming", "Electronics", "Art", "History", "Falconry",
        "E-Sports", "Mysticism", "Graphics Design", "Aviation", "Drugs", "International Relations",
        "Defense", "Foreign Affairs", "War Studies"
    };

    public final List<TopicResponseRepresentation> AllTopics;
    public final TopicResponseRepresentation TopicGeneral;

    public final List<PostResponseRepresentation> AllPosts;
    public final List<PostResponseRepresentation> AlLUserPosts;
    public final List<PostResponseRepresentation> AllAdminPosts;

    public final List<CommentResponseRepresentation> AllUserPostComments;
    public final List<CommentResponseRepresentation> AllAdminPostComments;

    public MockBlogData() {

        AllTopics = IntStream.range(0, TopicNames.length)
                .mapToObj(t -> createBlogTopicResponse(t, TopicNames[t]))
                .collect(Collectors.toList());
        TopicGeneral = AllTopics.get(0);

        AlLUserPosts = IntStream.range(0, 15)
                .mapToObj(i -> createBlogPostResponse(i, String.format("Post %s",i), String.format("Text %s",i), UserIdGuest, TopicGeneral))
                .collect(Collectors.toList());
        AllAdminPosts = IntStream.range(0, 10)
                .mapToObj(i -> createBlogPostResponse(i+15, String.format("Post %s",i), String.format("Text %s",i), UserIdAdmin, TopicGeneral))
                .collect(Collectors.toList());
        AllPosts = Stream.concat(AlLUserPosts.stream(), AllAdminPosts.stream())
                .collect(Collectors.toList());

        AllUserPostComments = IntStream.range(0, 15)
                .mapToObj(i -> createBlogCommentResponse(i, String.format("Comment %s",i), UserIdGuest, AlLUserPosts.get(0).getId()))
                .collect(Collectors.toList());
        AllAdminPostComments = IntStream.range(0, 15)
                .mapToObj(i -> createBlogCommentResponse(i, String.format("Comment %s",i), UserIdAdmin, AllAdminPosts.get(0).getId()))
                .collect(Collectors.toList());
    }

    public static CommentRequestRepresentation createBlogCommentRequest(String text) {
        return CommentRequestRepresentation.builder()
                .text(text)
                .build();
    }

    public static CommentResponseRepresentation createBlogCommentResponse(long id, String text, String userId, Long postId) {
        return CommentResponseRepresentation.builder()
                .id(id)
                .text(text)
                .owner(userId)
                .postId(postId)
                .build();
    }

    public static PostRequestRepresentation createBlogPostRequest(String title, String text) {
        Slugify slg = new Slugify();
        return PostRequestRepresentation.builder()
                .title(title)
                .slug(slg.slugify(title))
                .text(text)
                .build();
    }

    public static PostResponseRepresentation createBlogPostResponse(long id, String title, String text, String userId, TopicResponseRepresentation topic) {
        Slugify slg = new Slugify();
        return PostResponseRepresentation.builder()
                .id(id)
                .title(title)
                .slug(slg.slugify(title))
                .text(text)
                .owner(userId)
                .topics(Collections.singleton(topic))
                .createdOn(new Date())
                .build();
    }

    public static TopicRequestRepresentation createBlogTopicRequest(String caption) {
        return TopicRequestRepresentation.builder()
                .caption(caption)
                .build();
    }

    public static TopicResponseRepresentation createBlogTopicResponse(long id, String caption) {
        return TopicResponseRepresentation.builder()
                .id(id)
                .caption(caption)
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
