package org.zabardast.blog.services.exceptions;

import org.zabardast.blog.dto.TopicRequestRepresentation;
import org.zabardast.blog.dto.TopicResponseRepresentation;
import org.zabardast.blog.model.Topic;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

public class TopicAlreadyExistsException extends AlreadyExistsException {
    public TopicAlreadyExistsException(Topic topic) {
        super(String.format("Topic already exists %s", topic.getCaption()));
    }
    public TopicAlreadyExistsException(TopicResponseRepresentation topic) {
        super(String.format("Topic already exists %s", topic.getCaption()));
    }
    public TopicAlreadyExistsException(TopicRequestRepresentation topic) {
        super(String.format("Topic already exists %s", topic.getCaption()));
    }
}