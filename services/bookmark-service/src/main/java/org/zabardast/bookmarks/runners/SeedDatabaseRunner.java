package org.zabardast.bookmarks.runners;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.zabardast.bookmarks.dto.BookmarkRequestRepresentation;
import org.zabardast.bookmarks.services.BookmarkService;

@Slf4j
@Configuration
class SeedDatabaseRunner implements ApplicationRunner {

    public static final String UserIdGuest = "e7deac8e-56b7-4741-a119-757bbb00b999";
    public static final String UserIdAdmin = "742d6b04-89e8-4322-a9c4-179540b1eaaa";
    public static final String UserIdService = "2c21ad8e-2d19-4033-bd54-2cb778cd3eb7";

    @Autowired
    BookmarkService service;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        service.newBookmark(UserIdGuest, createBookmark("Microsoft", "http://www.microsoft.com"));
        service.newBookmark(UserIdGuest, createBookmark("Apple", "http://www.apple.com"));
        service.newBookmark(UserIdGuest, createBookmark("Google", "http://www.google.com"));
        service.newBookmark(UserIdGuest, createBookmark("Amazon", "http://www.amazon.com"));
        service.newBookmark(UserIdGuest, createBookmark("Oracle", "http://www.oracle.com"));
    }

    private BookmarkRequestRepresentation createBookmark(String caption, String url) {
        log.debug("Create bookmark: " + caption);
        return BookmarkRequestRepresentation.builder()
                .caption(caption)
                .url(url)
                .build();
    }
}
