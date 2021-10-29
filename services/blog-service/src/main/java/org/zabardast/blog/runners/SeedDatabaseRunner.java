package org.zabardast.blog.runners;

import lombok.extern.slf4j.Slf4j;
import org.zabardast.blog.dto.CommentRequestRepresentation;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.model.Topic;
import org.zabardast.blog.services.CommentService;
import org.zabardast.blog.services.PostService;

import org.zabardast.blog.services.PostTopicService;
import org.zabardast.blog.services.TopicService;
import com.github.slugify.Slugify;
import java.util.Arrays;
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
    public static final String UserIdUnknown = "00000000-0000-0000-0000-000000000000";

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
    @Autowired
    PostTopicService postTopicService;

    @Override
    public void run(String... strings) throws Exception {

        List<TopicResponseRepresentation> createdTopics = Arrays.stream(TopicNames)
                .map(t -> createBlogTopic(t))
                .collect(Collectors.toList());

        TopicResponseRepresentation topicGeneral = createdTopics.get(0);

        createBlogPost("Guest says Hello!", "This is a test post", UserIdGuest, topicGeneral.getId());
        createBlogPost("Admin says Hello!", "This is another test post", UserIdAdmin, topicGeneral.getId());
        createBlogPost("Guest is back!", "Third post completes hat-trick!", UserIdGuest, topicGeneral.getId());
        createBlogPost("Catch me if you can!", "Unknown User!", UserIdUnknown, topicGeneral.getId());
        createBlogPost("Catch me if you can 2!", "Unknown User!", UserIdUnknown, topicGeneral.getId());
        createBlogPost("Catch me if you can 3!", "Unknown User!", UserIdUnknown, topicGeneral.getId());
    }

    private CommentRequestRepresentation createComment(String text) {
        return CommentRequestRepresentation.builder()
                .text(text)
                .build();
    }

    private void createBlogPost(String title, String text, String userId, Long topicId) {
        log.debug("Create test blog post: " + title);
        Slugify slg = new Slugify();
        PostResponseRepresentation created = postService.newPost(userId, PostRequestRepresentation.builder()
                .title(title)
                .slug(slg.slugify(title))
                .text(text)
                .build());

        commentService.newComment(created.getId(), UserIdGuest, createComment("I like it"));
        commentService.newComment(created.getId(), UserIdUnknown, createComment("I like it, too!"));
        commentService.newComment(created.getId(), UserIdAdmin, createComment("I like it, too!"));
        commentService.newComment(created.getId(), UserIdUnknown, createComment("I like it, too!"));
        postTopicService.assignTopic(created.getId(), topicId);
    }

    private TopicResponseRepresentation createBlogTopic(String caption) {
        log.debug("Create test blog topic: " + caption);
        return topicService.newTopic(TopicRequestRepresentation.builder()
                .caption(caption)
                .build());
    }
}
