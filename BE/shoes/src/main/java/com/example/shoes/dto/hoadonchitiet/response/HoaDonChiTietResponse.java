package com.example.shoes.dto.hoadonchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Setter
@Getter
public class HoaDonChiTietResponse {
    private Integer id;
    private String maHoaDon;
    private String maSPCT;
    private String donGia;
    private Integer soLuong;
    private String trangThai;
}
