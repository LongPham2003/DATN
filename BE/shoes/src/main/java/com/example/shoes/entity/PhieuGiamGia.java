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
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ten_Voucher", nullable = false)
    private String tenVoucher;

    @Lob
    @Column(name = "Dieu_Kien_Giam_Gia")
    private String dieuKienGiamGia;

    @Column(name = "Muc_Giam", precision = 10, scale = 2)
    private BigDecimal mucGiam;

    @Column(name = "Giam_Toi_Da", precision = 10, scale = 2)
    private BigDecimal giamToiDa;

    @Column(name = "So_Luong")
    private Integer soLuong;

    @Column(name = "Ngay_Bat_Dau")
    private LocalDate ngayBatDau;

    @Column(name = "Ngay_Ket_Thuc")
    private LocalDate ngayKetThuc;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}