package com.backend.railwaybookingsystem.exceptions;

import com.backend.railwaybookingsystem.utils.MessagesUtils;

public class InternalServerErrorException extends RuntimeException {

    private final String message;

    public InternalServerErrorException(String message, Object... var2) {
        this.message = MessagesUtils.formatMessage(message, var2);
    }

    @Override
    public String getMessage() {
        return message;
    }
}
