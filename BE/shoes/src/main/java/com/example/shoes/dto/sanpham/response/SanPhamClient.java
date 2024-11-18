package com.example.shoes.dto.sanpham.response;

import lombok.Data;

import java.math.BigDecimal;


public interface SanPhamClient {
    Integer getIdSP();
    Integer getIdSPCT();
    String getTenSanPham();
    String getTenThuongHieu();
    BigDecimal getDonGia();

}
