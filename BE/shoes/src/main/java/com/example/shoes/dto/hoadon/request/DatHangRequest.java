package com.example.shoes.dto.hoadon.request;

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
public class DatHangRequest {
    private BigDecimal phiVanChuyen;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có đúng 10 chữ số")
    @Pattern(regexp = "0[0-9]{9}", message = "Số điện thoại phải bao gồm 10 chữ số và bắt đầu bằng số 0")
    private String soDienThoai;

    @NotBlank(message = "Tên khách hàng không được để trống")
    private String tenKhachHang;

    private String tinhThanhPho;

    private String huyenQuan;

    private String xaPhuong;

    private Boolean diaChiMacDinh;

    private String soNhaDuongThonXom;

    private String diaChiChiTiet;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date ngayDuKien;

    private BigDecimal tienPhaiThanhToan;

}
