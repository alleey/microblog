package org.zabardast.resources.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class FileNotFoundException extends NotFoundException {
    public FileNotFoundException(String resourceId) {
        super(String.format("Could not find file %d", resourceId));
    }
}