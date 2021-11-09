package org.zabardast.resources.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;
import org.zabardast.resources.model.ResourceKey;

public class ResourceNotFoundException extends NotFoundException {
    public ResourceNotFoundException(ResourceKey resource) {
        super(String.format("Resource not found %s/%s", resource.getResource(), resource.getKey()));
    }
}