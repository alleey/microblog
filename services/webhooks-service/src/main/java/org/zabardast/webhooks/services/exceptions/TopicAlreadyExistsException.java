package org.zabardast.webhooks.services.exceptions;

import org.zabardast.webhooks.dto.TopicRequestRepresentation;
import org.zabardast.webhooks.dto.TopicResponseRepresentation;
import org.zabardast.webhooks.model.WebHook;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

public class TopicAlreadyExistsException extends AlreadyExistsException {
    public TopicAlreadyExistsException(WebHook topic) {

        super(String.format("WebHook already exists %s", topic.getCaption()));
    }

    public TopicAlreadyExistsException(TopicResponseRepresentation topic) {

        super(String.format("WebHook already exists %s", topic.getCaption()));
    }

    public TopicAlreadyExistsException(TopicRequestRepresentation topic) {

        super(String.format("WebHook already exists %s", topic.getCaption()));
    }
}