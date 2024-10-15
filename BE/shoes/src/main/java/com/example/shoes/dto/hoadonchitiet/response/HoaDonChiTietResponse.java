package com.example.shoes.dto.hoadonchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter

public class HoaDonChiTietResponse {
    private Integer id;
    private String tenKhachHang;
    private String soDienThoai;
    private String diaChiGiaoHang;
    private BigDecimal tongTien;
    private BigDecimal tienDuocGiam;
    private BigDecimal tienPhaiThanhToan;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;
    private LocalDate ngayTao;
    private Boolean trangThai;
}
