package org.zabardast.blog.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class TopicNotFoundException extends NotFoundException {
    public TopicNotFoundException(Long topicId) {
        super(String.format("Could not find blog post comment %d", topicId));
    }
}