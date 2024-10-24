package com.example.shoes.dto.hoadonchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class HoaDonChiTietBHRespose {
    private Integer id;
    private Integer idHoaDon;
    private Integer idSpct;
    private String tenSanPham;
    private String maSanPham;
    private String chatLieu;
    private String mauSac;
    private String kichThuoc;
    private String thuongHieu;
    private String deGiay;
    private BigDecimal donGia; //don gia giay
    private Integer soLuong; //so luong
}
