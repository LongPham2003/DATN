package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "gio_hang_chi_tiet")
public class GioHangChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Gio_Hang")
    private GioHang idGioHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_San_Pham_Chi_Tiet")
    private SanPhamChiTiet idSanPhamChiTiet;

    @NotNull
    @Column(name = "So_Luong", nullable = false)
    private Integer soLuong;

    @NotNull
    @Column(name = "Don_Gia", nullable = false, precision = 10, scale = 2)
    private BigDecimal donGia;

}