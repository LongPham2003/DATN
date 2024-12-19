package com.example.shoes.dto.sanpham.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class SanPhamBanChayResponse {
    private Integer idSP;
    private Integer idSPCT;
    private BigDecimal donGia;
    private String maSanPham;
    private String tenSanPham;
    private Integer tongSoLuongDaBan;
}
