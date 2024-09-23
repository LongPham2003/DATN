package com.example.shoes.dto.taikhoan.request;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TaiKhoanRequest {
    @Email
    @NotBlank(message = "Chua")
    private String email;

    @NotBlank(message = "Mật khẩu trống")
    @Min(8)
    private String password;

   private Boolean trangThai;
}
