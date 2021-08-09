package org.zabardast.blog.runners;

import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.zabardast.blog.dto.CommentRepresentation;
import org.zabardast.blog.dto.PostRepresentation;
import org.zabardast.blog.dto.TopicRepresentation;
import org.zabardast.blog.model.Comment;
import org.zabardast.blog.model.Post;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.services.CommentService;
import org.zabardast.blog.services.PostService;

import org.zabardast.blog.services.TopicService;
import com.github.slugify.Slugify;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Slf4j
@Profile("!test")
@Configuration
class SeedDatabaseRunner implements CommandLineRunner {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    public static final String[] TopicNames = {
            "General", "Politics", "Religion", "Philosophy", "Science", "Sports", "Technology",
            "Cooking", "Gardening", "Programming", "Electronics", "Art", "History", "Falconry",
            "E-Sports", "Mysticism", "Graphics Design", "Aviation", "Drugs", "International Relations",
            "Defense", "Foreign Affairs", "War Studies"
    };

    @Autowired
    PostService postService;
    @Autowired
    CommentService commentService;
    @Autowired
    TopicService topicService;

    @Override
    public void run(String... strings) throws Exception {

        List<Topic> createdTopics = Arrays.stream(TopicNames)
                .map(t -> createBlogTopic(t))
                .collect(Collectors.toList());

        Topic topicGeneral = createdTopics.get(0);

        createBlogPost("Hello World", "This is a test post", UserIdGuest, topicGeneral);
        createBlogPost("Hello Again", "This is another test post", UserIdAdmin, topicGeneral);
        createBlogPost("Post Hattrick", "Third post completes hat-trick!", UserIdGuest, topicGeneral);
    }

    private CommentRepresentation createComment(String text) {
        return CommentRepresentation.builder()
                .text(text)
                .build();
    }

    private void createBlogPost(String title, String text, String userId, Topic topic) {
        log.debug("Create test blog post: " + title);
        Slugify slg = new Slugify();
        Post created = postService.newPost(userId, PostRepresentation.builder()
                .title(title)
                .slug(slg.slugify(title))
                .text(text)
                .build());

        commentService.newComment(created.getId(), UserIdGuest, createComment("I like it"));
        commentService.newComment(created.getId(), UserIdAdmin, createComment("I like it, too!"));
        postService.assignTopic(created.getId(), topic);
    }

    private Topic createBlogTopic(String caption) {
        log.debug("Create test blog topic: " + caption);
        return topicService.newTopic(TopicRepresentation.builder()
                .caption(caption)
                .build());
    }
}
