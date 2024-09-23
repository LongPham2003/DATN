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
@Table(name = "khach_hang")
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ho_Ten", nullable = false)
    private String hoTen;

    @Size(max = 20)
    @NotNull
    @Column(name = "SDT", nullable = false, length = 20)
    private String sdt;

    @Size(max = 255)
    @Column(name = "Email")
    private String email;

    @Column(name = "Ngay_Sinh")
    private LocalDate ngaySinh;

    @Size(max = 255)
    @Column(name = "Dia_Chi_Mac_Dinh")
    private String diaChiMacDinh;

    @Size(max = 10)
    @Column(name = "Gioi_Tinh", length = 10)
    private String gioiTinh;

    @NotNull
    @Column(name = "Ngay_Tao", nullable = false)
    private LocalDate ngayTao;

    @Column(name = "Ngay_Cap_Nhat")
    private LocalDate ngayCapNhat;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}