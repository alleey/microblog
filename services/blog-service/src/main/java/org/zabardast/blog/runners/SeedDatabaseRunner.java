package org.zabardast.blog.runners;

import com.github.slugify.Slugify;
import java.io.File;
import java.io.FileFilter;
import java.io.FilenameFilter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.zabardast.blog.config.InitialImportConfig;
import org.zabardast.blog.dto.CommentRequestRepresentation;
import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.dto.PostResponseRepresentation;
import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.services.CommentService;
import org.zabardast.blog.services.PostService;
import org.zabardast.blog.services.PostTopicService;
import org.zabardast.blog.services.TopicService;

@Slf4j
@Profile("!test")
@Configuration
class SeedDatabaseRunner implements ApplicationRunner {

    public static final String UserIdUnknown = "00000000-0000-0000-0000-000000000000";
    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";
    public static final String UserId1 = "473165a5-e52c-4129-9b28-61e0e018b0e1";
    public static final String UserId2 = "08cb7f2e-e8e0-4352-a9b6-7ef4fd683ea3";
    public static final String UserId3 = "13324963-cb7e-49d1-947a-cdda3d0e9282";

    @Autowired
    InitialImportConfig initialImportConfig;
    @Autowired
    PostService postService;
    @Autowired
    CommentService commentService;
    @Autowired
    TopicService topicService;
    @Autowired
    PostTopicService postTopicService;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if(!initialImportConfig.isEnabled()) {
            return;
        }

        Path storage = Paths.get(initialImportConfig.getLocation()).toAbsolutePath().normalize();
        log.info("Executing initial import of resources under: " + storage.toString());

        try {
            FileFilter filter = new FileFilter() {
                @Override
                public boolean accept(File pathname) {
                    return pathname.getName().toLowerCase().endsWith(".md");
                }
            };

            for (File dir : storage.toFile().listFiles())
            {
                if(!dir.isDirectory())
                    continue;

                TopicResponseRepresentation topic = createBlogTopic(dir.getName());

                for (File file: dir.listFiles(filter)) {
                    if(!file.isFile())
                        continue;

                    log.info("Import: " + file.toPath());
                    createBlogPost(
                            file.getName().substring(0, file.getName().lastIndexOf('.')),
                            Files.readString(file.toPath()),
                            UserIdAdmin,
                            topic.getId());
                }
            }
        } catch (Exception e) {
            log.warn("Resource import encountered an error: " + e.toString());
        }
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

//        commentService.newComment(created.getId(), UserIdGuest, createComment("I like it"));
//        commentService.newComment(created.getId(), UserIdUnknown, createComment("I like it, too!"));
//        commentService.newComment(created.getId(), UserIdAdmin, createComment("I like it, too!"));
//        commentService.newComment(created.getId(), UserIdUnknown, createComment("I like it, too!"));
        postTopicService.assignTopic(created.getId(), topicId);
    }

    private TopicResponseRepresentation createBlogTopic(String caption) {
        log.debug("Create test blog topic: " + caption);
        return topicService.newTopic(TopicRequestRepresentation.builder()
                .caption(caption)
                .build());
    }
}
