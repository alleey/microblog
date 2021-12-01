package org.zabardast.webhooks.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class TopicNotFoundException extends NotFoundException {
    public TopicNotFoundException(Long topicId) {

        super(String.format("Could not find webhooks eventHandler comment %d", topicId));
    }
}