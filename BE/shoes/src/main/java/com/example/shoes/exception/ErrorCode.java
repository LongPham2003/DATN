package com.example.shoes.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(404, "User Not Found"),
    USER_EXISTS(400, "User Already Exists"),
    USER_NOT_EXISTS(400, "User Not Exists"),
    USER_NAME_INVALID(400, "User Name Invalid"),
    ;
    private  int code;
    private  String message;

}
