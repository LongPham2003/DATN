package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "san_pham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_loai")
    private Loai idLoai;

    @Size(max = 255)
    @NotNull
    @Column(name = "ten_san_pham")
    private String tenSanPham;

    @NotNull
    @Column(name = "ngay_tao")
    private LocalDate ngayTao;

    @Lob
    @Column(name = "mo_ta")
    private String moTa;

    @NotNull
    @Column(name = "trang_thai")
    private Boolean trangThai;

}