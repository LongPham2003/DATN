package com.example.shoes.dto.hoadon.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Setter
@Getter

public class HoaDonRequest {
    private Integer idNhanVien;
    private String ma;
    private Integer idKhachHang;
    private Integer idPhieuGiamGia;
    private String sdt;
    private BigDecimal tienKhachDua;
    private String diaChiGiaoHang;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;

}
