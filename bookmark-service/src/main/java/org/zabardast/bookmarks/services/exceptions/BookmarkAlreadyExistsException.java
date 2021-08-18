package org.zabardast.bookmarks.services.exceptions;

import org.zabardast.bookmarks.dto.BookmarkResponseRepresentation;
import org.zabardast.common.services.exceptions.ResourceAlreadyExistsException;

public class BookmarkAlreadyExistsException extends ResourceAlreadyExistsException {
    public BookmarkAlreadyExistsException(BookmarkResponseRepresentation bookmark) {
        super(String.format("Bookmark already exists %s", bookmark.getCaption()));
    }
}