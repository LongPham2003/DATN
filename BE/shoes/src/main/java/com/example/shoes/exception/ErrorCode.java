package com.example.shoes.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(404, "User Not Found", HttpStatus.NOT_FOUND),
    USER_EXISTS(400, "User Already Exists", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTS(400, "User Not Exists", HttpStatus.BAD_REQUEST),
    USER_NAME_INVALID(400, "User Name Invalid", HttpStatus.BAD_REQUEST),
    UN_AUTHENTICATED(401, "Un Authenticated", HttpStatus.UNAUTHORIZED),
    UN_AUTHORIZED(401, "Un Authorized", HttpStatus.FORBIDDEN),
    ;
    private  int code;
    private  String message;
    private HttpStatusCode httpStatusCode;

}
