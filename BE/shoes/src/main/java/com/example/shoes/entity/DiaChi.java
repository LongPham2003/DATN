package com.example.shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dia_chi")
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "tinh_thanh_pho")
    private String tinhThanhPho;

    @Column(name = "huyen_quan")
    private String huyenQuan;

    @Column(name = "xa_phuong")
    private String xaPhuong;

    @Column(name = "dia_chi_mac_dinh")
    private Boolean diaChiMacDinh;

    @ManyToOne
    @JoinColumn(name = "id_khach_hang", referencedColumnName = "id")
    private KhachHang khachHang;

}