package com.example.shoes.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error",HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    SDT_EXISTED(1002, "SDT đã tồn tại", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "password must be at character 3 ", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "password must be at character 8 ", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Tài khoản không tồn tại ", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Bạn cần đăng nhập ", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007,"Bạn không có quyền truy cập",HttpStatus.FORBIDDEN),
    INVALID_DOB(1008,"Your age must be at {min}",HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(1009,"In valid credentials",HttpStatus.BAD_REQUEST),
    PASSWORD_OR_EMAIL_FALSE(1010,"Tài khoản hoặc mật khẩu không đúng ",HttpStatus.BAD_REQUEST),
    MATERIAL_NOT_FOUND(1005, "Không tìm thay chat lieu ", HttpStatus.NOT_FOUND),
    SHOE_SOLE_NOT_FOUND(1005, "Không tìm thấy   de giay  ", HttpStatus.NOT_FOUND),
    IMAGE_NOT_FOUND(1005, "Không tìm thấy  hinh anh  ", HttpStatus.NOT_FOUND),
    SIZE_NOT_FOUND(1005, "Không tìm thấy  kich thuoc  ", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND(1005, "Không tìm thấy  loai  ", HttpStatus.NOT_FOUND),
    COLOR_NOT_FOUND(1005, "Không tìm thấy  mau sac  ", HttpStatus.NOT_FOUND),
    VOUCHER_NOT_FOUND(1005,"Không tìm thấy phiếu giảm giá",HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND(1005,"Không tìm thấy sản phẩm",HttpStatus.NOT_FOUND),
    BRAND_NOT_FOUND(1005,"Không tìm thấy thuong hieu",HttpStatus.NOT_FOUND),
    ATTRIBUTE_EXISTED(1005, "Đã Tồn Tại ", HttpStatus.BAD_REQUEST),
    THUONG_HIEU_EXISTED(1005, "Đã Tồn Tại ", HttpStatus.BAD_REQUEST),
    PRODUCT_DETAIL_NOT_FOUND(1005, "khong tim thay san pham chi tiet ", HttpStatus.NOT_FOUND),
    STAFF(1005, "khong tim thay nhan vien ", HttpStatus.NOT_FOUND),
    CUSTOMER(1005, "khong tim thay khach hang ", HttpStatus.NOT_FOUND),
    BILL_NOT_FOUND(1005,"khong tim thay hoa don",HttpStatus.NOT_FOUND),
    BILL_DETAIL_NOT_FOUND(1005,"khong tim thay hoa don chi tiet",HttpStatus.NOT_FOUND),
    INVALID_QUANTITY(1002,"Số lượng yêu cầu không hợp lệ.",HttpStatus.BAD_REQUEST),
    INVALID_QUANTITY_LONHONO(1002,"Số lượng sản phẩm phải lớn hơn 0.",HttpStatus.BAD_REQUEST),
    VOUCHER_IN_BILL(1002,"hóa đơn  đa có phiếu giảm giá",HttpStatus.BAD_REQUEST),
    INVALID_VOUCHER(1002,"Đơn hàng không đủ điều kiện áp dụng mã giảm giá..",HttpStatus.BAD_REQUEST),
    INSUFFICIENT_STOCK(1002,"số lượng có đủ để thêm vào hóa đơn",HttpStatus.BAD_REQUEST),
    INVALID_QUANTITY_VOUCHER(1002,"Số lượng không  còn .",HttpStatus.BAD_REQUEST),
    VOUCHER_NOT_IN_BILL(1002,"voucher chưa có trong hóa đơn .",HttpStatus.BAD_REQUEST),
    VALID_PHIEU_GIAM_GIA(1002,"Ngày kết thúc phải sau ngày bắt đầu.",HttpStatus.BAD_REQUEST),
    VALID_PHIEU_GIAM_GIA_MUC_GIAM(1002,"Mức giảm không hợp lệ",HttpStatus.BAD_REQUEST),
    VALID_PHIEU_GIAM_GIA_DK_GIAM(1002,"Điều kiện giảm không hợp lệ",HttpStatus.BAD_REQUEST),
    BILL_NOT_FOUND_h(1005,"du lieu không đung",HttpStatus.NOT_FOUND),
    INSUFFICIENT_PAYMENT(1002,"Số tiền khách đưa không đủ để thanh toán.",HttpStatus.BAD_REQUEST),
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
