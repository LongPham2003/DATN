package com.example.shoes.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_khach_hang")
    private KhachHang idKhachHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nhan_vien")
    private NhanVien idNhanVien;

    @Column(name = "ten_dang_nhap")
    private String tenDangNhap;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "chuc_vu")
    private String chucVu;

    @Column(name = "trang_thai")
    private Boolean trangThai;

}