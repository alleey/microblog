package org.zabardast.resources.services.exceptions;

import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

public class ResourceAlreadyExistsException extends AlreadyExistsException {
    public ResourceAlreadyExistsException(ResourceResponseRepresentation resource) {
        super(String.format("Resource already exists %s/%s", resource.getResource(), resource.getKey()));
    }
}