package com.example.shoes.repository;

import com.example.shoes.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GioHangChiTietRepo extends JpaRepository<GioHangChiTiet, Integer> {
//GioHangChiTiet findByGioHangIdAndSanPhamChiTietId(Integer gioHangId, Integer sanPhamChiTietId);
}
