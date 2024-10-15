package com.example.shoes.dto.authentication.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SignUpRequest {

    @Email(message = "Email chưa đúng định dạng")
    private String email;

    @Min(value = 8,message = "Mật Khẩu Lớn Hơn 8 Kí Tự")
    private String password;

    private Boolean trangThai;

    private String hoTen;

    private String tinhThanhPho;

    private String huyenQuan;

    private String xaPhuong;




}
