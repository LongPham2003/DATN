package com.example.shoes.dto.hoadonchitiet.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Setter
@Getter
public class HoaDonChiTietResponse {
    private Integer id;
    private Integer idHoaDon;
    private Integer idSpct;
    private BigDecimal donGia;
    private Integer soLuong;
    private Boolean trangThai;

}
