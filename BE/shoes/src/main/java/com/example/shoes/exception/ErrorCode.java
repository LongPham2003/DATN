package com.example.shoes.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error",HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "USER EXISTED", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "password must be at character 3 ", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "password must be at character 8 ", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "USER not existead ", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "unanthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007,"you do not have pemision",HttpStatus.FORBIDDEN),
    INVALID_DOB(1008,"Your age must be at {min}",HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(1009,"In valid credentials",HttpStatus.BAD_REQUEST),
    PASSWORD_EXITED(1010,"PASSWORD EXID",HttpStatus.BAD_REQUEST);

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;

    }
}
