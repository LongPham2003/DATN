package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "dia_chi")
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_khach_hang")
    private KhachHang idKhachHang;

    @Size(max = 255)
    @NotNull
    @Column(name = "ten", nullable = false)
    private String ten;

    @Size(max = 20)
    @NotNull
    @Column(name = "sdt", nullable = false, length = 20)
    private String sdt;

    @Size(max = 255)
    @NotNull
    @Column(name = "tinh_thanh_pho", nullable = false)
    private String tinhThanhPho;

    @Size(max = 255)
    @NotNull
    @Column(name = "huyen_quan", nullable = false)
    private String huyenQuan;

    @Size(max = 255)
    @NotNull
    @Column(name = "xa_phuong", nullable = false)
    private String xaPhuong;

    @NotNull
    @Column(name = "dia_chi_mac_dinh", nullable = false)
    private Boolean diaChiMacDinh = false;

}