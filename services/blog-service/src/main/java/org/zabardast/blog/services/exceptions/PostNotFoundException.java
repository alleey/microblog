package org.zabardast.blog.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class PostNotFoundException extends NotFoundException {
    public PostNotFoundException(Long postId) {
        super(String.format("Could not find blog post %d", postId));
    }
}