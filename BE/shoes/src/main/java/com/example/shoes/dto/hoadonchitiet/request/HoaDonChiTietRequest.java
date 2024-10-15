package com.example.shoes.dto.hoadonchitiet.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter

public class HoaDonChiTietRequest {
    private Integer idKhachHang;
    private Integer idNhanVien;
    private Integer idPhieuGiamGia;
    private String soDienThoai;
    private String diaChiGiaoHang;
    private BigDecimal tongTien;
    private BigDecimal tienDuocGiam;
    private BigDecimal tienPhaiThanhToan;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;
    private Boolean trangThai;
}
