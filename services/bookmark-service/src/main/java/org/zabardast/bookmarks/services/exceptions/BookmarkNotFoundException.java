package org.zabardast.bookmarks.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class BookmarkNotFoundException extends NotFoundException {
    public BookmarkNotFoundException(Long bookmarkId) {
        super(String.format("Could not find blog post comment %d", bookmarkId));
    }
}