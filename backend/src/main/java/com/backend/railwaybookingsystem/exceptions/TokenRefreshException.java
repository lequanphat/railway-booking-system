package com.backend.railwaybookingsystem.exceptions;

import com.backend.railwaybookingsystem.utils.MessagesUtils;

public class TokenRefreshException extends RuntimeException{
    private String message;

    public TokenRefreshException(String message, Object... var2) {
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
