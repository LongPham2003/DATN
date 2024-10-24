package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepo extends JpaRepository<HoaDon, Integer> {
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = true")
    List<HoaDon> getAllTrangThaiTrue();
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = false ")
    List<HoaDon> getAllTrangThaiFalse();
<<<<<<< HEAD
=======

>>>>>>> bd7a636b62ded312868c21701a87c623a8c11d53
    // Query để lấy mã hóa đơn lớn nhất
    @Query("SELECT s.ma FROM HoaDon s ORDER BY s.ma DESC LIMIT 1")
    String findMaxMaHoaDon();
}
