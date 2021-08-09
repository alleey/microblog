package org.zabardast.blog.services.exceptions;

import org.zabardast.blog.model.Post;
import org.zabardast.common.services.exceptions.ResourceAlreadyExistsException;

public class PostAlreadyExistsException extends ResourceAlreadyExistsException {
    public PostAlreadyExistsException(Post post) {
        super(String.format("Post already exists having slug %s", post.getSlug()));
    }
}