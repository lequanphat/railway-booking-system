package com.backend.railwaybookingsystem.exceptions;

import com.backend.railwaybookingsystem.utils.MessagesUtils;

public class AuthenticationException extends RuntimeException {

    private String message;

    public AuthenticationException(String message, Object... var2) {
        this.message = MessagesUtils.formatMessage(message, var2);
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}