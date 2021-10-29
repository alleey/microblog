package org.zabardast.blog.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class PostNotFoundException extends ResourceNotFoundException {
    public PostNotFoundException(Long postId) {
        super(String.format("Could not find blog post %d", postId));
    }
}