package com.admin.the_climbing_night.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import lombok.extern.slf4j.Slf4j;

/**
 * Global Exception Handler
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<SingleResponse<Object>> handleCustomException(CustomException ex) {
        SingleResponse<Object> response = new SingleResponse<>();
        Result result = new Result(ex);

        response.setResult(result);
        response.setData(null);

        log.info(
                "\n############################################################################### END ###############################################################################");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
