package org.zabardast.resources.services.exceptions;

import org.zabardast.common.services.exceptions.AlreadyExistsException;
import org.zabardast.resources.model.ResourceKey;

public class ResourceAlreadyExistsException extends AlreadyExistsException {
    public ResourceAlreadyExistsException(ResourceKey resource) {
        super(String.format("Resource already exists %s/%s", resource.getResource(), resource.getKey()));
    }
}