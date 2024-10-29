package com.example.shoes.dto.hoadonchitiet.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
public class HoaDonChiTietBHRespose {
    private Integer id;
    private Integer idHoaDon;
    private Integer idSpct;
    private String tenSanPham;
    private String maSPCT;
    private String chatLieu;
    private String mauSac;
    private String kichThuoc;
    private String thuongHieu;
    private String deGiay;
    private String donGia; //don gia giay
    private Integer soLuong; //so luong
    public HoaDonChiTietBHRespose(Integer id, Integer idHoaDon, Integer idSpct, String tenSanPham,
                                  String maSPCT, String chatLieu, String mauSac, String kichThuoc,
                                  String thuongHieu, String deGiay, BigDecimal donGia, Integer soLuong) {
        this.id = id;
        this.idHoaDon = idHoaDon;
        this.idSpct = idSpct;
        this.tenSanPham = tenSanPham;
        this.maSPCT = maSPCT;
        this.chatLieu = chatLieu;
        this.mauSac = mauSac;
        this.kichThuoc = kichThuoc;
        this.thuongHieu = thuongHieu;
        this.deGiay = deGiay;
        this.donGia = donGia != null ? donGia.toString() : null; // Chuyển đổi thành String
        this.soLuong = soLuong;
    }
}
