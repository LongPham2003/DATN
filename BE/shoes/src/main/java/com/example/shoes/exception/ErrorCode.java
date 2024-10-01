package com.example.shoes.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error",HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "password must be at character 3 ", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "password must be at character 8 ", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Tài khoản không tồn tại ", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "unanthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007,"you do not have pemision",HttpStatus.FORBIDDEN),
    INVALID_DOB(1008,"Your age must be at {min}",HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(1009,"In valid credentials",HttpStatus.BAD_REQUEST),
    PASSWORD_OR_EMAIL_FALSE(1010,"Tài khoản hoặc mật khẩu không đúng ",HttpStatus.BAD_REQUEST),
    MATERIAL_NOT_FOUND(1005, "Không tìm thay chat lieu ", HttpStatus.NOT_FOUND),
    SHOE_SOLE_NOT_FOUND(1005, "Không tìm thấy   de giay  ", HttpStatus.NOT_FOUND),
    IMAGE_NOT_FOUND(1005, "Không tìm thấy  hinh anh  ", HttpStatus.NOT_FOUND),
    SIZE_NOT_FOUND(1005, "Không tìm thấy  kich thuoc  ", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND(1005, "Không tìm thấy  loai  ", HttpStatus.NOT_FOUND),
    COLOR_NOT_FOUND(1005, "Không tìm thấy  mau sac  ", HttpStatus.NOT_FOUND),
    BRAND_NOT_FOUND(1005, "Không tìm thấy  thuong hieu  ", HttpStatus.NOT_FOUND)
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;

    }
}
