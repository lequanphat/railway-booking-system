package com.farukgenc.boilerplate.springboot.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
@Getter
@AllArgsConstructor
public class AppException extends RuntimeException {
	private String message;
	private HttpStatus status;

}
