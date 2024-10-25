package com.example.shoes.dto.phieugiamgia.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class PhieuGiamGiaRequest {

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
    @FutureOrPresent(message = "Ngày bắt đầu không được là quá khứ")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm[:ss]")
    private LocalDateTime ngayBatDau;

    @NotNull(message = "Ngày kết thúc không được để trống")
    @FutureOrPresent(message = "Ngày bắt đầu không được là quá khứ")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm[:ss]")
    private LocalDateTime ngayKetThuc;

    private Boolean trangThai;

    @NotNull(message = "Hình thức giảm không được để trống")
    private String hinhThucGiam;

}
