package com.example.shoes.dto.hoadon.request;

import com.example.shoes.entity.PhieuGiamGia;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class HoaDonUpdateAdmin
{
    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String soDienThoai;
    private String diaChiGiaoHang;
    private BigDecimal phiVanChuyen;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date ngayDuKien;
    @NotBlank(message = "Họ tên không được để trống")
    @Size(min = 3, max = 50, message = "Tên phải có độ dài từ 3 đến 50 ký tự")
    @Pattern(
            regexp = "^[\\p{L}\\p{Mn}\\s]+$",
            message = "Tên chỉ được chứa chữ cái và khoảng trắng"
    )
    private String tenKhachHang;
}
