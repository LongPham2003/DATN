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

    private String tongDoanhThu;
    private String tongTienDaApDungPhieuGiamGia;
    private Integer soLuongHoaDon;

    private Integer soLuongKhachHang;
    private LocalDate ngayTao;
}
