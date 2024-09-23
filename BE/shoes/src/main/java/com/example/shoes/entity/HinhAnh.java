package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hinh_anh")
public class HinhAnh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ten_Anh", nullable = false)
    private String tenAnh;

    @Column(name = "Du_Lieu_Anh")
    private byte[] duLieuAnh;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_San_Pham_Chi_Tiet")
    private SanPhamChiTiet idSanPhamChiTiet;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}