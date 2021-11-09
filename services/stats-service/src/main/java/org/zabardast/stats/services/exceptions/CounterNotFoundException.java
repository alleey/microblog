package org.zabardast.stats.services.exceptions;

import org.zabardast.common.services.exceptions.NotFoundException;

public class CounterNotFoundException extends NotFoundException {
    public CounterNotFoundException(String counter) {
        super(String.format("Could not find counter %s", counter));
    }
}