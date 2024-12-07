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

    private String hoTen;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String sdt;

    @Email(message = "Email không hợp lệ")
    private String email;

    @Temporal(TemporalType.DATE)
    @Past(message = "Ngày sinh phải là ngày trong quá khứ")
    private Date ngaySinh;


    private String gioiTinh;

    @Min(value = 8,message = "Mật Khẩu Lớn Hơn 8 Kí Tự")
    private String matKhau;

    private Boolean trangThai;
    @NotBlank(message = "Huyện/Quận không được để trống")
    private String huyenQuan;

    @NotBlank(message = "Tỉnh/Thành phố không được để trống")
    private String tinhThanhPho;

    @NotBlank(message = "Xã/Phường không được để trống")
    private String xaPhuong;

    private String diaChiChiTiet;

    @NotBlank(message = "Số nhà không được để trống")
    private String soNhaDuongThonXom;


}
