package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "ten_voucher", nullable = false)
    private String tenVoucher;

    @Lob
    @Column(name = "dieu_kien_giam_gia")
    private String dieuKienGiamGia;

    @Column(name = "muc_giam", precision = 10, scale = 2)
    private BigDecimal mucGiam;

    @Column(name = "giam_toi_da", precision = 10, scale = 2)
    private BigDecimal giamToiDa;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "ngay_bat_dau")
    private LocalDate ngayBatDau;

    @Column(name = "ngay_ket_thuc")
    private LocalDate ngayKetThuc;

    @NotNull
    @Column(name = "trang_thai", nullable = false)
    private Boolean trangThai = false;

}