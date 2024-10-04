package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_khach_hang")
    private KhachHang idKhachHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nhan_vien")
    private NhanVien idNhanVien;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_phieu_giam_gia")
    private PhieuGiamGia idPhieuGiamGia;

    @NotNull
    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "dia_chi_giao_hang")
    private String diaChiGiaoHang;

    @NotNull
    @Column(name = "tong_tien")
    private BigDecimal tongTien;

    @Column(name = "tien_duoc_giam")
    private BigDecimal tienDuocGiam;

    @NotNull
    @Column(name = "tien_phai_thanh_toan")
    private BigDecimal tienPhaiThanhToan;

    @NotNull
    @Column(name = "phuong_thuc_thanh_toan")
    private String phuongThucThanhToan;

    @NotNull
    @Column(name = "phuong_thuc_giao_hang")
    private String phuongThucGiaoHang;

    @NotNull
    @Column(name = "ngay_tao")
    private LocalDate ngayTao;

    @Column(name = "ngay_sua")
    private LocalDate ngaySua;

    @NotNull
    @Column(name = "trang_thai")
    private Boolean trangThai;

}