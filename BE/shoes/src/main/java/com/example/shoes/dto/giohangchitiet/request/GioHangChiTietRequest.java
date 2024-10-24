package com.example.shoes.dto.giohangchitiet.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class GioHangChiTietRequest {
    private Integer idGioHang;
    private Integer idSanPhamChiTiet;
    private Integer soLuong;
    private BigDecimal donGia;
}
