package org.zabardast.blog.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class CommentNotFoundException extends NotFoundException {
    public CommentNotFoundException(Long commentId) {
        super(String.format("Could not find blog post comment %d", commentId));
    }
}