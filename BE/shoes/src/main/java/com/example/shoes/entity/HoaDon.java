package com.example.shoes.entity;

import com.example.shoes.entity.base.CrudByAt;
import com.example.shoes.enums.TrangThai;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "hoa_don")
public class HoaDon extends CrudByAt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ma")
    private String ma;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_khach_hang")
    private KhachHang idKhachHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nhan_vien")
    private NhanVien idNhanVien;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_phieu_giam_gia")
    private PhieuGiamGia idPhieuGiamGia;

    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "dia_chi_giao_hang")
    private String diaChiGiaoHang;

    @Column(name = "tong_tien")
    private BigDecimal tongTien;

    @Column(name = "phi_van_chuyen")
    private BigDecimal phiVanChuyen;

    @Column(name = "tien_duoc_giam")
    private BigDecimal tienDuocGiam;

    @Column(name = "tien_phai_thanh_toan")
    private BigDecimal tienPhaiThanhToan;

//    @Column(name = "tien_khach_dua")
//    private BigDecimal tienKhachDua;
//
//    @Column(name = "tien_thua")
//    private BigDecimal tienThua;

    @Column(name = "phuong_thuc_thanh_toan")
    private String phuongThucThanhToan;

    @Column(name = "phuong_thuc_giao_hang")
    private String phuongThucGiaoHang;

    @Column(name = "ngay_du_kien")
    private Date ngayDuKien;

    @Column(name = "ten_khach_hang")
    private String tenKhachHang;

    @Column(name = "trang_thai_don_hang")
    @Enumerated(EnumType.STRING)
    private TrangThai trangThaiDonHang;

    @Column(name = "trang_thai_thanh_toan")
    private Boolean trangThaiThanhToan;
    // Thiết lập quan hệ OneToMany với HoaDonChiTiet
    @OneToMany(mappedBy = "idHoaDon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HoaDonChiTiet> hoaDonChiTiets; // Phương thức getHoaDonChiTiets() sẽ lấy danh sách chi tiết hóa đơn
}