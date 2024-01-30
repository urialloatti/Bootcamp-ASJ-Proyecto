package com.asj.suppliersApp.exceptions;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

public class BadRequestException extends Exception {
    public BadRequestException(String message) {
        super(message);
    }
}
