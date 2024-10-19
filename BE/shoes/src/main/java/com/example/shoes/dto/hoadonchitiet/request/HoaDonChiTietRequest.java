package com.example.shoes.dto.hoadonchitiet.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class HoaDonChiTietRequest {
    private Integer idHoaDon;
    private Integer idSpct;  // id của SanPhamChiTiet
    private Integer soLuong;
    private BigDecimal donGia;
    private Boolean trangThai;
}
