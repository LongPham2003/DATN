package com.example.shoes.dto.hoadon.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter

public class HoaDonResponse {
    private Integer id;
    private String ma;
    private String tenNhanVien;
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
