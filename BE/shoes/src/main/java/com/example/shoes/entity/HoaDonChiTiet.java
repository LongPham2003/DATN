package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "hoa_don_chi_tiet")
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_SPCT")
    private SanPhamChiTiet idSpct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Hoa_Don")
    private HoaDon idHoaDon;

    @NotNull
    @Column(name = "So_Luong", nullable = false)
    private Integer soLuong;

    @NotNull
    @Column(name = "Don_Gia", nullable = false, precision = 10, scale = 2)
    private BigDecimal donGia;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}