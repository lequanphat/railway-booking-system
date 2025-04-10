package com.backend.railwaybookingsystem.exceptions;

import com.backend.railwaybookingsystem.dtos.error.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@Slf4j
public class ApiExceptionHandler {
    private static final String ERROR_LOG_FORMAT = "Error: URI: {}, ErrorCode: {}, Message: {}";

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(AuthenticationException ex, WebRequest request) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        String message = ex.getMessage();

        return buildErrorResponse(status, message, null, ex, request, 401);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex, WebRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        String message = ex.getMessage();

        return buildErrorResponse(status, message, null, ex, request, 404);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException ex, WebRequest request) {
        return handleBadRequest(ex, false, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();

        return buildErrorResponse(status, "Request information is not valid", errors, ex, null, 0);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        List<String> errors = ex.getConstraintViolations().stream()
                .map(violation -> String.format("%s %s: %s",
                        violation.getRootBeanClass().getName(),
                        violation.getPropertyPath(),
                        violation.getMessage()))
                .toList();

        return buildErrorResponse(status, "Request information is not valid", errors, ex, null, 0);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return handleBadRequest(ex, true, null);
    }

    @ExceptionHandler(DuplicatedException.class)
    protected ResponseEntity<ErrorResponse> handleDuplicated(DuplicatedException ex) {
        return handleBadRequest(ex, false, null);
    }

    @ExceptionHandler(InternalServerErrorException.class)
    protected ResponseEntity<ErrorResponse> handleInternalServerErrorException(InternalServerErrorException e) {
        log.error("Internal server error exception: ", e);
        ErrorResponse errorVm = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), e.getMessage());
        return ResponseEntity.internalServerError().body(errorVm);
    }

    @ExceptionHandler(TokenRefreshException.class)
    protected ResponseEntity<ErrorResponse> handleTokenRefreshException(TokenRefreshException e) {
        return handleBadRequest(e, false, null);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleOtherException(Exception ex, WebRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = ex.getMessage();

        return buildErrorResponse(status, message, null, ex, request, 500);
    }

    private String getServletPath(WebRequest webRequest) {
        ServletWebRequest servletRequest = (ServletWebRequest) webRequest;
        return servletRequest.getRequest().getServletPath();
    }

    private ResponseEntity<ErrorResponse> handleBadRequest(Exception ex, boolean isUsingNestedException, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message =
                isUsingNestedException ? NestedExceptionUtils.getMostSpecificCause(ex).getMessage() : ex.getMessage();

        return buildErrorResponse(status, message, null, ex, request, 400);
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String message, List<String> errors,
                                                       Exception ex, WebRequest request, int statusCode) {
        ErrorResponse errorVm =
                new ErrorResponse(status.toString(), status.getReasonPhrase(), message, errors);

        if (request != null) {
            log.error(ERROR_LOG_FORMAT, this.getServletPath(request), statusCode, message);
            log.info("Error: ", ex);
        }
        return ResponseEntity.status(status).body(errorVm);
    }
}