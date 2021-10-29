package org.zabardast.blog.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class TopicNotFoundException extends ResourceNotFoundException {
    public TopicNotFoundException(Long topicId) {
        super(String.format("Could not find blog post comment %d", topicId));
    }
}