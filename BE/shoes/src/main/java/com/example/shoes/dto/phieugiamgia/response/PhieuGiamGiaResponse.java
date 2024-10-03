package com.example.shoes.dto.phieugiamgia.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
public class PhieuGiamGiaResponse {

    private Integer id;

    private String tenVoucher;

    private String dieuKienGiamGia;

    private BigDecimal mucGiam;

    private BigDecimal giamToiDa;

    private Integer soLuong;

    private LocalDate ngayBatDau;

    private LocalDate ngayKetThuc;

    private Boolean trangThai;
}
