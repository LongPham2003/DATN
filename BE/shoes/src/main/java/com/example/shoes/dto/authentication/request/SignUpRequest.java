package com.example.shoes.dto.authentication.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SignUpRequest {

    @Size(min = 15, max = 50, message = "Tài khoản phải có độ dài từ 15 đến 50 ký tự")
    @Email(message = "Email chưa đúng định dạng")
    private String email;

    @Size(min = 8,max = 50,message = "Mật khẩu lớn hơn 8 kí tự và nhỏ hơn 50 kí tự")
    private String password;

    private Boolean trangThai;

    @Size(min = 3, max = 50, message = "Tên phải có độ dài từ 3 đến 50 ký tự")
    @Pattern(
            regexp = "^[a-zA-Z\\s]+$",
            message = "Tên chỉ được chứa chữ cái và khoảng trắng"
    )
    private String hoTen;

    private String tinhThanhPho;

    private String huyenQuan;

    private String xaPhuong;




}
