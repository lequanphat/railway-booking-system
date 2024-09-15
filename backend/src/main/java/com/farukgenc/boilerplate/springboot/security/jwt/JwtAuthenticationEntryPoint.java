package com.farukgenc.boilerplate.springboot.security.jwt;

import com.farukgenc.boilerplate.springboot.exceptions.ApiExceptionResponse;
import com.farukgenc.boilerplate.springboot.exceptions.AppException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {

		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

		String errorResponse = "{\"message\": \"" + authException.getMessage() + "\"}";
		response.getWriter().write(errorResponse);
	}

}
