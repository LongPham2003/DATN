package com.example.shoes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
@Setter
@Getter
@NoArgsConstructor
public class BaoCaoThongKeResponse {
    private String tongTienPhaiThanhToan;
    private String chiPhi;
    private String loiNhuan;
    private Integer soLuongHoaDon;
    private String tienDuocGiam;
    private Integer soLuongKhachHang;
    private LocalDate ngayTao;
}
