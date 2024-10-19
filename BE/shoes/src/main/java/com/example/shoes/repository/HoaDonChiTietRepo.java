package com.example.shoes.repository;

import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HoaDonChiTietRepo extends JpaRepository<HoaDonChiTiet, Integer> {
    // Tìm chi tiết hóa đơn theo hóa đơn và sản phẩm chi tiết
    @Query("SELECT hdc FROM HoaDonChiTiet hdc WHERE hdc.idHoaDon = ?1 AND hdc.idSpct = ?2")
    HoaDonChiTiet findByHoaDonAndSanPhamChiTiet(HoaDon hoaDon, SanPhamChiTiet spct);
}
