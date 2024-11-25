//package com.example.shoes.entity;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotNull;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "phuong_thuc_thanh_toan")
//public class PhuongThucThanhToan {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Integer id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_hoa_don")
//    private HoaDon idHoaDon;
//
//    @NotNull
//    @Column(name = "ten_phuong_thuc")
//    private String tenPhuongThuc;
//
//    @Lob
//    @Column(name = "ghi_chu")
//    private String ghiChu;
//
//}