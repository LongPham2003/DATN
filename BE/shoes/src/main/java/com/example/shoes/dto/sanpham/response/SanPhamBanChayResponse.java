package com.example.shoes.dto.sanpham.response;

import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class SanPhamBanChayResponse {
    private Integer idSP;
    private String donGia;
    private String maSanPham;
    private String tenSanPham;
    private Integer tongSoLuongDaBan;
}
