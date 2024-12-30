package com.example.shoes.dto.nhanvien.request;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Getter
@Setter
public class NhanvienAddRequest {

    @NotBlank(message = "Họ tên không được để trống")
    @Size(min = 3, max = 50, message = "Tên phải có độ dài từ 3 đến 50 ký tự")
    @Pattern(
            regexp = "^[\\p{L}\\p{Mn}\\s]+$",
            message = "Tên chỉ được chứa chữ cái và khoảng trắng"
    )
    private String hoTen;


    private String ma;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String sdt;

    private String gioiTinh;

    @Email(message = "Không đúng định dạng email")
    @Size(min = 15, max = 50, message = "Tài khoản phải có độ dài từ 15 đến 50 ký tự")
    private String email;

    @NotBlank(message = "Không được để trống địa chỉ")
    @Size(min = 30, max = 255, message = "Địa chỉ có độ dài từ 30 đến 255 ký tự")
    private String diaChi;
    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngày sinh không được là ngày trong tương lai")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Enumerated(EnumType.STRING)
    private Roles roles;

    @Size(min = 8,max = 50,message = "Mật khẩu lớn hơn 8 kí tự và nhỏ hơn 50 kí tự")
    private  String matKhau;


    private TaiKhoan taiKhoan;
}