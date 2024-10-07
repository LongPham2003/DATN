package com.example.shoes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "san_pham")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_loai")
    @JsonBackReference
    private Loai idLoai;

    @Size(max = 255)
    @NotNull
    @Column(name = "ten_san_pham")
    private String tenSanPham;

    @NotNull
    @Column(name = "ngay_tao")
    private LocalDate ngayTao;

    @Lob
    @Column(name = "mo_ta")
    private String moTa;

    @NotNull
    @Column(name = "trang_thai")
    private Boolean trangThai;

    public SanPham(Integer idSanPham){
        this.id = idSanPham;
    }

}