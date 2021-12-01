package org.zabardast.webhooks.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class CommentNotFoundException extends NotFoundException {
    public CommentNotFoundException(Long commentId) {

        super(String.format("Could not find webhooks eventHandler comment %d", commentId));
    }
}