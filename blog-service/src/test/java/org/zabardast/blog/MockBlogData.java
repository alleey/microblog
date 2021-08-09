package org.zabardast.blog;

import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.slugify.Slugify;
import java.util.Arrays;
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

    public final List<Topic> AllTopics;
    public final Topic TopicGeneral;

    public final List<Post> AllPosts;
    public final List<Post> AlLUserPosts;
    public final List<Post> AllAdminPosts;

    public MockBlogData() {

        AllTopics = IntStream.range(0, TopicNames.length)
                .mapToObj(t -> createBlogTopic(t, TopicNames[t]))
                .collect(Collectors.toList());
        TopicGeneral = AllTopics.get(0);

        AlLUserPosts = IntStream.range(0, 15)
                .mapToObj(i -> createBlogPost(i, String.format("Post %s",i), String.format("Text %s",i), UserIdGuest, TopicGeneral))
                .collect(Collectors.toList());
        AllAdminPosts = IntStream.range(0, 10)
                .mapToObj(i -> createBlogPost(i+15, String.format("Post %s",i), String.format("Text %s",i), UserIdAdmin, TopicGeneral))
                .collect(Collectors.toList());
        AllPosts = Stream.concat(AlLUserPosts.stream(), AllAdminPosts.stream())
                .collect(Collectors.toList());
    }

    public static Comment createBlogComment(long id, String text, String userId) {
        return Comment.builder()
                .id(id)
                .text(text)
                .owner(userId)
                .build();
    }

    public static Post createBlogPost(long id, String title, String text, String userId, Topic topic) {
        Slugify slg = new Slugify();
        return Post.builder()
                .id(id)
                .title(title)
                .slug(slg.slugify(title))
                .text(text)
                .owner(userId)
                .comments(Arrays.asList(
                    createBlogComment(1,"I like it", UserIdGuest),
                    createBlogComment(2,"I like it, too!", UserIdAdmin)
                ))
                .topics(Collections.singleton(topic))
                .createdOn(new Date())
                .build();
    }

    public static Topic createBlogTopic(long id, String caption) {
        return Topic.builder()
                .id(id)
                .caption(caption)
                .build();
    }

    public static String objectToJson(Object post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(post);
    }
}
