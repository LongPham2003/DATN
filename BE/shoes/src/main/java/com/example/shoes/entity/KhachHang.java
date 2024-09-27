package com.example.shoes.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "khach_hang")
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "email")
    private String email;

    @Column(name = "ngay_sinh")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Column(name = "dia_chi_mac_dinh")
    private String diaChiMacDinh;

    @Column(name = "gioi_tinh", length = 10)
    private String gioiTinh;


    @Column(name = "trang_thai")
    private Boolean trangThai;

    @OneToOne
    @JoinColumn(name = "id_tai_khoan",referencedColumnName = "id")
    private TaiKhoan taiKhoan;


}