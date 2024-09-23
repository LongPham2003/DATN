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
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Khach_Hang")
    private KhachHang idKhachHang;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ten", nullable = false)
    private String ten;

    @Size(max = 20)
    @NotNull
    @Column(name = "SDT", nullable = false, length = 20)
    private String sdt;

    @Size(max = 255)
    @NotNull
    @Column(name = "Tinh_Thanh_Pho", nullable = false)
    private String tinhThanhPho;

    @Size(max = 255)
    @NotNull
    @Column(name = "Huyen_Quan", nullable = false)
    private String huyenQuan;

    @Size(max = 255)
    @NotNull
    @Column(name = "Xa_Phuong", nullable = false)
    private String xaPhuong;

    @NotNull
    @Column(name = "Dia_Chi_Mac_Dinh", nullable = false)
    private Boolean diaChiMacDinh = false;

}