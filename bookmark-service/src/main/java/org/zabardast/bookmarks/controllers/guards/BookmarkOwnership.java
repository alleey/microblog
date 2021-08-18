package org.zabardast.bookmarks.controllers.guards;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.bookmarks.services.BookmarkService;
import org.zabardast.bookmarks.services.exceptions.BookmarkNotFoundException;

@Slf4j
@Component
public class BookmarkOwnership {
    @Autowired
    BookmarkService bookmarkService;

    public boolean require(Long bookmarkId, Authentication authentication) {
        BookmarkResponseRepresentation bookmark = bookmarkService.getBookmark(bookmarkId);
        if(bookmark == null)
            throw new BookmarkNotFoundException(bookmarkId);
        return bookmark.getOwner().equalsIgnoreCase(authentication.getName());
    }
}
