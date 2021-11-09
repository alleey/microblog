package org.zabardast.bookmarks.services.exceptions;

import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

public class BookmarkAlreadyExistsException extends AlreadyExistsException {
    public BookmarkAlreadyExistsException(BookmarkResponseRepresentation bookmark) {
        super(String.format("Bookmark already exists %s", bookmark.getCaption()));
    }
}