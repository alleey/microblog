package org.zabardast.stats.services.exceptions;

import org.zabardast.common.services.exceptions.ResourceNotFoundException;

public class CounterNotFoundException extends ResourceNotFoundException {
    public CounterNotFoundException(String counter) {
        super(String.format("Could not find counter %s", counter));
    }
}