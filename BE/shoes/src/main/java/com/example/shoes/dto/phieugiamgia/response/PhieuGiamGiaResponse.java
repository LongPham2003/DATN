package com.example.shoes.dto.phieugiamgia.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
public class PhieuGiamGiaResponse {

    private Integer id;

    private String tenVoucher;

    private String dieuKienGiamGia;

    private String mucGiam;

    private String giamToiDa;

    private Integer soLuong;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm[:ss]")
    private LocalDateTime ngayBatDau;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm[:ss]")
    private LocalDateTime ngayKetThuc;

    private Boolean trangThai;

    private String hinhThucGiam;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime ngayTao;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime ngayCapNhat;
    private String nguoiTao;
    private String nguoiCapNhat;
}
