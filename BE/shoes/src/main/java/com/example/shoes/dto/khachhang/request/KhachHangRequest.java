package com.example.shoes.dto.khachhang.request;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


import java.util.Date;

@Getter
@Setter
@Builder
public class KhachHangRequest {

    private Integer id;

    private String ma;

    @NotBlank(message = "Họ tên không được để trống")
    @Size(min = 3, max = 50, message = "Tên phải có độ dài từ 3 đến 50 ký tự")
    @Pattern(
            regexp = "^[\\p{L}\\p{Mn}\\s]+$",
            message = "Tên chỉ được chứa chữ cái và khoảng trắng"
    )
    private String hoTen;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String sdt;

    @Email(message = "Không đúng định dạng email")
    @Size(min = 15, max = 50, message = "Tài khoản phải có độ dài từ 15 đến 50 ký tự")
    private String email;

    @Temporal(TemporalType.DATE)
    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngày sinh phải là ngày trong quá khứ")
    private Date ngaySinh;

    @Size(min = 3,message = "Vui lòng chọn giới tính")
    private String gioiTinh;

    @Size(min = 8,max = 50,message = "Mật khẩu lớn hơn 8 kí tự và nhỏ hơn 50 kí tự")
    private String matKhau;

    private Boolean trangThai;

    @NotBlank(message = "Tỉnh/Thành phố không được để trống")
    private String tinhThanhPho;

    @NotBlank(message = "Huyện/Quận không được để trống")
    private String huyenQuan;

    @NotBlank(message = "Xã/Phường không được để trống")
    private String xaPhuong;

    private String diaChiChiTiet;

    @NotBlank(message = "Số nhà không được để trống")
    private String soNhaDuongThonXom;


}