package com.example.shoes.entity;

import com.example.shoes.entity.base.CrudByAt;
import com.example.shoes.enums.TrangThai;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "lich_su_hoa_don")
public class LichSuHoaDon extends CrudByAt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_hoa_don")
    private HoaDon idHoaDon;

    @Lob
    @Column(name = "mo_ta")
    private String moTa;


    @Column(name = "thoi_gian")
    private LocalDate thoiGian;

    @Column(name = "nguoi_thuc_hien")
    private String nguoiThucHien;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private TrangThai trangThai;

}