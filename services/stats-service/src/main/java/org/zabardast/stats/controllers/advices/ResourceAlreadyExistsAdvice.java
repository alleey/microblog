package org.zabardast.stats.controllers.advices;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.zabardast.common.services.exceptions.AlreadyExistsException;

@ControllerAdvice
public class ResourceAlreadyExistsAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(AlreadyExistsException.class)
    String resourceAlreadyExistsHandler(AlreadyExistsException exception) {
        return exception.getMessage();
    }
}