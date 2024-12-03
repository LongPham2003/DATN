package com.example.shoes.dto.hoadon.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private String tongTien;
    private String tienDuocGiam;
    private String tienPhaiThanhToan;
    private String tienKhachDua;
    private String tienThua;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;
    private LocalDateTime ngayTao;
    private String trangThaiDonHang;
    private String trangThaiThanhToan;
    private String tienShip;
    private String PhieuGiamGia;
}



