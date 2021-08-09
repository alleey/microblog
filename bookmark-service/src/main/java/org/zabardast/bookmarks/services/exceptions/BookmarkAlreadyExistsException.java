package org.zabardast.bookmarks.services.exceptions;

import org.zabardast.bookmarks.model.Bookmark;
import org.zabardast.common.services.exceptions.ResourceAlreadyExistsException;

public class BookmarkAlreadyExistsException extends ResourceAlreadyExistsException {
    public BookmarkAlreadyExistsException(Bookmark bookmark) {
        super(String.format("Bookmark already exists %s", bookmark.getCaption()));
    }
}