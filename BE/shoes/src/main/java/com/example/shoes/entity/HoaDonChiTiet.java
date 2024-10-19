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
    private Integer id;

    // Thiết lập quan hệ ManyToOne với HoaDon
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_hoa_don")
    private HoaDon idHoaDon; // Đây là cột id_hoa_don liên kết với bảng HoaDon

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_spct")
    private SanPhamChiTiet idSpct; // Liên kết với bảng SanPhamChiTiet

    @NotNull
    @Column(name = "so_luong")
    private Integer soLuong; // Số lượng sản phẩm được mua

    @NotNull
    @Column(name = "don_gia")
    private BigDecimal donGia; // Đơn giá sản phẩm

    @Column(name = "trang_thai")
    private Boolean trangThai;
}