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

    @NotBlank(message = "Tên voucher không được để trống")
    private String tenVoucher;

    @NotNull(message = "Điều kiện giảm giá không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Điều kiện giảm giá phải lớn hơn 0")
    private BigDecimal dieuKienGiamGia;

    @NotNull(message = "Mức giảm không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Mức giảm phải lớn hơn 0")
    private BigDecimal mucGiam;

    @NotNull(message = "Giảm tối đa không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giảm tối đa phải lớn hơn 0")
    private BigDecimal giamToiDa;

    @NotNull(message = "Số lượng không được để trống")
    @PositiveOrZero(message = "Số lượng phải là số không âm")
    private Integer soLuong;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDate ngayBatDau;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDate ngayKetThuc;

    private Boolean trangThai;

    @NotNull(message = "Ngày kết thúc không được để trống")
    private String hinhThucGiam;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime ngayTao;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime ngayCapNhat;
    private String nguoiTao;
    private String nguoiCapNhat;
}
