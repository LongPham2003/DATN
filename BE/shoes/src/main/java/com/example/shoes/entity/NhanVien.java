package com.example.shoes.entity;

import com.example.shoes.enums.Roles;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Entity
@Table(name = "nhan_vien")
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "email")
    private String email;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "ngay_sinh")
    @Temporal(TemporalType.DATE)
    Date ngaySinh;

    @Column(name = "gioi_tinh")
    private String gioiTinh;

    @Column(name = "dia_chi")
    private String diaChi;


    @Enumerated(EnumType.STRING)
    private Roles roles;


    @OneToOne
    @JoinColumn(name = "id_tai_khoan", referencedColumnName = "id")
    private TaiKhoan taiKhoan;

}