package org.zabardast.blog.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class CommentNotFoundException extends ResourceNotFoundException {
    public CommentNotFoundException(Long commentId) {
        super(String.format("Could not find blog post comment %d", commentId));
    }
}