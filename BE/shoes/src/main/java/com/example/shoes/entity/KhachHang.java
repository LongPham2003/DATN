package com.example.shoes.entity;

import com.example.shoes.entity.base.CrudByAt;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "khach_hang")
public class KhachHang extends CrudByAt {
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

    @Column(name = "gioi_tinh", length = 10)
    private String gioiTinh;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    @OneToOne
    @JoinColumn(name = "id_tai_khoan",referencedColumnName = "id")
    private TaiKhoan taiKhoan;

    @OneToMany(mappedBy = "khachHang",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<DiaChi> diaChis;


}