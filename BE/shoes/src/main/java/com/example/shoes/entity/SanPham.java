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
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Loai")
    private Loai idLoai;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ten_San_Pham", nullable = false)
    private String tenSanPham;

    @NotNull
    @Column(name = "Ngay_Tao", nullable = false)
    private LocalDate ngayTao;

    @Lob
    @Column(name = "Mo_Ta")
    private String moTa;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}