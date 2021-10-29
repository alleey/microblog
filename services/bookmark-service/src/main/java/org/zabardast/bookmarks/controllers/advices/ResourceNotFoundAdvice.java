package org.zabardast.bookmarks.controllers.advices;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.zabardast.common.services.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ResourceNotFoundAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    String resourceNotFoundHandler(ResourceNotFoundException exception) {
        return exception.getMessage();
    }
}