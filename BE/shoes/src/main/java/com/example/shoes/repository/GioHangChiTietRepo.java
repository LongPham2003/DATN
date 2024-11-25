package com.example.shoes.repository;

import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.GioHangChiTiet;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.SanPhamChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GioHangChiTietRepo extends JpaRepository<GioHangChiTiet, Integer> {
    @Query("SELECT g FROM GioHangChiTiet g WHERE g.idGioHang = :gioHang AND g.idSanPhamChiTiet = :sanPhamChiTiet")
    Optional<GioHangChiTiet> findByGioHangAndSanPhamChiTiet(
            @Param("gioHang") GioHang gioHang,
            @Param("sanPhamChiTiet") SanPhamChiTiet sanPhamChiTiet
    );
    @Query("SELECT ghct FROM GioHangChiTiet ghct " +
            "JOIN ghct.idGioHang gh " +
            "JOIN gh.idKhachHang kh " +
            "WHERE kh.id = :khachHangId")
    List<GioHangChiTiet> findByKhachHangId(@Param("khachHangId") Integer khachHangId);
    Optional<GioHangChiTiet> findByIdGioHang_IdKhachHang_IdAndIdSanPhamChiTiet_Id(
            Integer khachHangId,
            Integer sanPhamChiTietId);
    List<GioHangChiTiet> findByIdGioHang(GioHang idGioHang);
    // Đếm số lượng sản phẩm chi tiết trong giỏ hàng
    @Query("SELECT COUNT(g) FROM GioHangChiTiet g WHERE g.idGioHang.id = :idGioHang")
    Integer countByGioHangId(@Param("idGioHang") Integer idGioHang);

    List<GioHangChiTiet> findByIdSanPhamChiTiet(SanPhamChiTiet sanPhamChiTiet);

    @Query("SELECT g FROM GioHangChiTiet g WHERE g.idGioHang.id = :idGioHang")
    List<GioHangChiTiet> findByIdGioHang(@Param("idGioHang") Integer idGioHang);

    @Query(value = """
    SELECT * FROM datn.gio_hang_chi_tiet where id= :idGHCT
""" , nativeQuery = true)
    GioHangChiTiet findByIdGHCT(@Param("idGHCT") Integer idGHCT);

    @Modifying
    @Transactional
    @Query("DELETE FROM GioHangChiTiet g WHERE g.idSanPhamChiTiet.id = :idSanPhamChiTiet")
    void deleteByIdSanPhamChiTiet(@Param("idSanPhamChiTiet") Integer idSanPhamChiTiet);
}

