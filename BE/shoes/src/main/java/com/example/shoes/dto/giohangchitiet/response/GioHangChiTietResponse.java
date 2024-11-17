package com.example.shoes.dto.giohangchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class GioHangChiTietResponse {
    private Integer id;
    private Integer idGioHang;
    private Integer idSanPhamChiTiet;
    private Integer soLuong;
    private String donGia;
}
