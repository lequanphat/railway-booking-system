package com.farukgenc.boilerplate.springboot.exceptions;

import com.farukgenc.boilerplate.springboot.controller.RegistrationController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
@RestControllerAdvice
public class AppExceptionAdvice {

	@ExceptionHandler(AppException.class)
	ResponseEntity<ApiExceptionResponse> handleAppException(AppException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getMessage(), exception.getStatus(), LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
