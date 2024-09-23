package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "phuong_thuc_thanh_toan")
public class PhuongThucThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_Hoa_Don")
    private HoaDon idHoaDon;

    @Size(max = 255)
    @NotNull
    @Column(name = "Ten_Phuong_Thuc", nullable = false)
    private String tenPhuongThuc;

    @Lob
    @Column(name = "Ghi_Chu")
    private String ghiChu;

}