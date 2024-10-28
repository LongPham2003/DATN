package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepo extends JpaRepository<HoaDon, Integer> {
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = 'đã thanh toán'")
    List<HoaDon> getAllTrangThaiDaThanhToan();
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = 'chưa thanh toán' ")
    List<HoaDon> getAllTrangThaiChuaThanhToan();
    // Query để lấy mã hóa đơn lớn nhất
    @Query("SELECT s.ma FROM HoaDon s ORDER BY s.ma DESC LIMIT 1")
    String findMaxMaHoaDon();
}
