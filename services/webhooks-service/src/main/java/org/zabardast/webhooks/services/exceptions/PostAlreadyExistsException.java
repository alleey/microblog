package org.zabardast.webhooks.services.exceptions;

import org.zabardast.webhooks.dto.EventHandlerRequestRepresentation;
import org.zabardast.webhooks.model.EventHandler;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

public class PostAlreadyExistsException extends AlreadyExistsException {
    public PostAlreadyExistsException(EventHandler eventHandler) {

        super(String.format("EventHandler already exists having slug %s", eventHandler.getSlug()));
    }

    public PostAlreadyExistsException(EventHandlerRequestRepresentation post) {

        super(String.format("EventHandler already exists having slug %s", post.getSlug()));
    }
}