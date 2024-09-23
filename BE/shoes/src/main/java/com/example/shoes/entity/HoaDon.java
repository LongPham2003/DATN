package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "hoa_don")
public class HoaDon {
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Phieu_Giam_Gia")
    private PhieuGiamGia idPhieuGiamGia;

    @Size(max = 20)
    @NotNull
    @Column(name = "So_Dien_Thoai", nullable = false, length = 20)
    private String soDienThoai;

    @Size(max = 255)
    @Column(name = "Dia_Chi_Giao_Hang")
    private String diaChiGiaoHang;

    @NotNull
    @Column(name = "Tong_Tien", nullable = false, precision = 10, scale = 2)
    private BigDecimal tongTien;

    @Column(name = "Tien_Duoc_Giam", precision = 10, scale = 2)
    private BigDecimal tienDuocGiam;

    @NotNull
    @Column(name = "Tien_Phai_Thanh_Toan", nullable = false, precision = 10, scale = 2)
    private BigDecimal tienPhaiThanhToan;

    @Size(max = 255)
    @NotNull
    @Column(name = "Phuong_Thuc_Thanh_Toan", nullable = false)
    private String phuongThucThanhToan;

    @Size(max = 255)
    @NotNull
    @Column(name = "Phuong_Thuc_Giao_Hang", nullable = false)
    private String phuongThucGiaoHang;

    @NotNull
    @Column(name = "Ngay_Tao", nullable = false)
    private LocalDate ngayTao;

    @Column(name = "Ngay_Sua")
    private LocalDate ngaySua;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}