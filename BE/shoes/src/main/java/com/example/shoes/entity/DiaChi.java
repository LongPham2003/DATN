package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "dia_chi")
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_khach_hang")
    private KhachHang idKhachHang;

    @NotNull
    @Column(name = "ten")
    private String ten;

    @NotNull
    @Column(name = "sdt")
    private String sdt;

    @NotNull
    @Column(name = "tinh_thanh_pho")
    private String tinhThanhPho;

    @NotNull
    @Column(name = "huyen_quan")
    private String huyenQuan;

    @NotNull
    @Column(name = "xa_phuong")
    private String xaPhuong;

    @NotNull
    @Column(name = "dia_chi_mac_dinh")
    private Boolean diaChiMacDinh;

}