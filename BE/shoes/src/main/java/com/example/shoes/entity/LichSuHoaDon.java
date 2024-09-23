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
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Hoa_Don")
    private HoaDon idHoaDon;

    @Lob
    @Column(name = "Mo_Ta")
    private String moTa;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "Thoi_Gian")
    private Instant thoiGian;

    @Size(max = 255)
    @Column(name = "Nguoi_Thuc_Hien")
    private String nguoiThucHien;

}