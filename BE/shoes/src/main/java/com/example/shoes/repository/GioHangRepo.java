package com.example.shoes.repository;

import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GioHangRepo extends JpaRepository<GioHang, Integer> {

    // Phương thức để tìm giỏ hàng theo khách hàng
    Optional<GioHang> findByIdKhachHang(KhachHang khachHang);
    Optional<GioHang> findByIdKhachHang_Id(Integer idKhachHang); // Tìm giỏ hàng theo idKhachHang
}
