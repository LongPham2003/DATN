package com.example.shoes.dto.nhanvien.request;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Getter
@Setter
public class NhanvienAddRequest {

    @NotBlank(message = "Họ tên không được để trống")
    private String hoTen;


    private String ma;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String sdt;

    private String gioiTinh;

    private String email;


    private String diaChi;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Enumerated(EnumType.STRING)
    private Roles roles;

    private  String matKhau;


    private TaiKhoan taiKhoan;
}
