package com.example.shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "kich_thuoc")
@AllArgsConstructor
@NoArgsConstructor
public class KichThuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "kich_thuoc")
    private String kichThuoc;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    public KichThuoc(Integer idDeGiay) {
        this.id = idDeGiay;
    }

}