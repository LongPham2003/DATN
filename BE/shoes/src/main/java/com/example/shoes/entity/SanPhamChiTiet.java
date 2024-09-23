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
@Table(name = "san_pham_chi_tiet")
public class SanPhamChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_San_Pham")
    private SanPham idSanPham;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Chat_Lieu")
    private ChatLieu idChatLieu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Mau_Sac")
    private MauSac idMauSac;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Kich_Thuoc")
    private KichThuoc idKichThuoc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Thuong_Hieu")
    private ThuongHieu idThuongHieu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_De_Giay")
    private DeGiay idDeGiay;

    @NotNull
    @Column(name = "Don_Gia", nullable = false, precision = 10, scale = 2)
    private BigDecimal donGia;

    @NotNull
    @Column(name = "So_Luong", nullable = false)
    private Integer soLuong;

    @NotNull
    @Column(name = "Ngay_Tao", nullable = false)
    private LocalDate ngayTao;

    @Column(name = "Ngay_Cap_Nhat")
    private LocalDate ngayCapNhat;

    @NotNull
    @Column(name = "Trang_Thai", nullable = false)
    private Boolean trangThai = false;

}