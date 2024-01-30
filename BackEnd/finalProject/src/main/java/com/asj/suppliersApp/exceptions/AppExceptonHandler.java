package com.asj.suppliersApp.exceptions;

import com.asj.suppliersApp.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptonHandler {
    private final String ACCESS_DENIED = "access_denied_reason";

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> resourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(new ApiResponse<>(ex.getMessage()));
    }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse> badRequest(BadRequestException ex) {
        return ResponseEntity.status(400).body(new ApiResponse<>(ex.getMessage()));
    }
}
