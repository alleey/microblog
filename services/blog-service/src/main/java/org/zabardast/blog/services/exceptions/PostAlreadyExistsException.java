package org.zabardast.blog.services.exceptions;

import org.zabardast.blog.dto.PostRequestRepresentation;
import org.zabardast.blog.model.Post;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

public class PostAlreadyExistsException extends AlreadyExistsException {
    public PostAlreadyExistsException(Post post) {
        super(String.format("Post already exists having slug %s", post.getSlug()));
    }
    public PostAlreadyExistsException(PostRequestRepresentation post) {
        super(String.format("Post already exists having slug %s", post.getSlug()));
    }
}