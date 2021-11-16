package org.zabardast.resources.controllers.advices;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
public class MaxUploadSizeExceededAdvice {

    public static final String MAXIMUM_UPLOAD_SIZE_EXCEEDED = "Maximum upload size exceeded";

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MaxUploadSizeExceededException.class})
    String maxUploadSizeExceededException(MaxUploadSizeExceededException exception) {
        return MAXIMUM_UPLOAD_SIZE_EXCEEDED;
    }
}