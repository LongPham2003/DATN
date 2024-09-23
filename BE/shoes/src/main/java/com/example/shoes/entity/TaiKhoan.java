package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Khach_Hang")
    private KhachHang idKhachHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Nhan_Vien")
    private NhanVien idNhanVien;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ten_Dang_Nhap")
    private String tenDangNhap;

    @Size(max = 255)
    @NotNull
    @Column(name = "Password")
    private String password;

    @Size(max = 255)
    @NotNull
    @Column(name = "Chuc_Vu")
    private String chucVu;

    @NotNull
    @Column(name = "enabled")
    private Boolean enabled = false;

}