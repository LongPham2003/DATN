package com.example.shoes.repository;

import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.GioHangChiTiet;
import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GioHangChiTietRepo extends JpaRepository<GioHangChiTiet, Integer> {
    Optional<GioHangChiTiet> findByIdGioHangAndIdSanPhamChiTiet(GioHang gioHang, SanPhamChiTiet sanPhamChiTiet);
    @Query("SELECT ghct FROM GioHangChiTiet ghct " +
            "JOIN ghct.idGioHang gh " +
            "JOIN gh.idKhachHang kh " +
            "WHERE kh.id = :khachHangId")
    List<GioHangChiTiet> findByKhachHangId(@Param("khachHangId") Integer khachHangId);
}

