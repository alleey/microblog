package org.zabardast.bookmarks.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class BookmarkNotFoundException extends ResourceNotFoundException {
    public BookmarkNotFoundException(Long bookmarkId) {
        super(String.format("Could not find blog post comment %d", bookmarkId));
    }
}