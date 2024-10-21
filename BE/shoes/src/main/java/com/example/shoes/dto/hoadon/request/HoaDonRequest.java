package com.example.shoes.dto.hoadon.request;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter

public class HoaDonRequest {
    private Integer idNhanVien;
    private Integer idKhachHang;
    private Integer idPhieuGiamGia;
    private String soDienThoai;
    private String diaChiGiaoHang;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;

}
