package org.zabardast.bookmarks.controllers.advices;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.zabardast.common.services.exceptions.ResourceAlreadyExistsException;

@ControllerAdvice
public class ResourceAlreadyExistsAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    String resourceAlreadyExistsHandler(ResourceAlreadyExistsException exception) {
        return exception.getMessage();
    }
}