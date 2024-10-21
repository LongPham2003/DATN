package com.example.shoes.entity;

import com.example.shoes.entity.base.CrudByAt;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "phieu_giam_gia")
public class PhieuGiamGia extends CrudByAt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank(message = "Tên voucher không được để trống")
    @Column(name = "ten_voucher")
    private String tenVoucher;

    @NotNull(message = "Điều kiện giảm giá không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Điều kiện giảm giá phải lớn hơn 0")
    @Column(name = "dieu_kien_giam_gia")
    private BigDecimal dieuKienGiamGia;

    @Column(name = "hinh_thuc_giam")
    private String hinhThucGiam;


    @NotNull(message = "Mức giảm không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Mức giảm phải lớn hơn 0")
    @Column(name = "muc_giam")
    private BigDecimal mucGiam;

    @NotNull(message = "Giảm tối đa không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giảm tối đa phải lớn hơn 0")
    @Column(name = "giam_toi_da")
    private BigDecimal giamToiDa;


    @NotNull(message = "Số lượng không được để trống")
    @PositiveOrZero(message = "Số lượng phải là số không âm")
    @Column(name = "so_luong")
    private Integer soLuong;


    @NotNull(message = "Ngày bắt đầu không được để trống")
    @Column(name = "ngay_bat_dau")
    private LocalDate ngayBatDau;

    @NotNull(message = "Ngày kết thúc không được để trống")
    @Column(name = "ngay_ket_thuc")
    private LocalDate ngayKetThuc;


    @Column(name = "trang_thai")
    private Boolean trangThai;
}