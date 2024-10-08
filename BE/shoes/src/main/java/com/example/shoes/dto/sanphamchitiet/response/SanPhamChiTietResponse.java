package com.example.shoes.dto.sanphamchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class SanPhamChiTietResponse {
    private Integer id;
    private String tenSanPham;
    private String chatLieu;
    private String mauSac;
    private String kichThuoc;
    private String thuongHieu;
    private String deGiay;
    private BigDecimal donGia;
    private Integer soLuong;
    private Boolean trangThai;
}
