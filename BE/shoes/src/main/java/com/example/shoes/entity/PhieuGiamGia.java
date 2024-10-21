package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "phieu_giam_gia")
public class PhieuGiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "ten_voucher")
    private String tenVoucher;

    @Lob
    @Column(name = "dieu_kien_giam_gia")
    private String dieuKienGiamGia;

    @Column(name = "muc_giam")
    private BigDecimal mucGiam;

    @Column(name = "giam_toi_da")
    private BigDecimal giamToiDa;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "ngay_bat_dau")
    private LocalDate ngayBatDau;

    @Column(name = "ngay_ket_thuc")
    private LocalDate ngayKetThuc;

    @NotNull
    @Column(name = "trang_thai")
    private Boolean trangThai;
}