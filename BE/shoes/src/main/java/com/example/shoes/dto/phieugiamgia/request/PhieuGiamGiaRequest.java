package com.example.shoes.dto.phieugiamgia.request;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PhieuGiamGiaRequest {

    private String tenVoucher;

    private String dieuKienGiamGia;

    private BigDecimal mucGiam;

    private BigDecimal giamToiDa;

    private Integer soLuong;

    private LocalDate ngayBatDau;

    private LocalDate ngayKetThuc;

    private Boolean trangThai;

    private String hinhThucGiam;

}
