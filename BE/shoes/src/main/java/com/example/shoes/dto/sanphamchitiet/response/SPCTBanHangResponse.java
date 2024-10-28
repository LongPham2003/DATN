package com.example.shoes.dto.sanphamchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class SPCTBanHangResponse {
    private Integer id;
    private String tenSanPham;
    private String maSanPham;
    private String chatLieu;
    private String mauSac;
    private String kichThuoc;
    private String thuongHieu;
    private String deGiay;
    private String donGia;
    private Integer soLuong;
    private Boolean trangThai;
}
