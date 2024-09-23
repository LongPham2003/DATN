package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "lich_su_hoa_don")
public class LichSuHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_hoa_don")
    private HoaDon idHoaDon;

    @Lob
    @Column(name = "mo_ta")
    private String moTa;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "thoi_gian")
    private Instant thoiGian;

    @Size(max = 255)
    @Column(name = "nguoi_thuc_hien")
    private String nguoiThucHien;

}