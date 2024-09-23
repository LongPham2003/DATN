package com.example.shoes.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {
        ApiResponse apiRespone = new ApiResponse();

        apiRespone.setCode(1001);
        apiRespone.setMessage(exception.getMessage());

        return ResponseEntity.badRequest().body(apiRespone);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        return ResponseEntity.status(errorCode.getStatusCode())
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());

    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiRespone = new ApiResponse();

        apiRespone.setCode(errorCode.getCode());

        apiRespone.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()).body(apiRespone);
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
      String enumKey = exception.getBindingResult().getFieldError().getDefaultMessage();
      ErrorCode errorCode = ErrorCode.valueOf(enumKey);
      ApiResponse apiRespone = new ApiResponse();
      apiRespone.setCode(errorCode.getCode());
      apiRespone.setMessage(errorCode.getMessage());
      return ResponseEntity.status(errorCode.getStatusCode()).body(apiRespone);
    }
}
