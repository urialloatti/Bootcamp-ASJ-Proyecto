package com.asj.suppliersApp.exceptions;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

public class BadRequestBodyChecker {
    public static void checkBody(BindingResult bindingResult) throws BadRequestException {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessageBuilder = new StringBuilder("Hay errores en el formulario:\n");
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessageBuilder.append("\t" + error.getField() + ": " + error.getDefaultMessage() + " (" + error.getRejectedValue() + ") | \n");
            }
            throw new BadRequestException(errorMessageBuilder.toString());
        }
    }

}
