package com.example.shoes.dto.taikhoan.request;

import com.example.shoes.enums.Roles;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TaiKhoanRequest {
    @Email (message = "Chưa đúng định dạng")
    private String email;

    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    private String password;

    private Boolean trangThai;

}
