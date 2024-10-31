package com.example.shoes.dto.hoadon.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Setter
@Getter
public class HoaDonTheoIDResponse {
    private Integer idKhachHang;
    private Integer idVoucher;
    private String tongTien;
    private String tienDuocGiam;
    private String tienPhaiThanhToan;
}
