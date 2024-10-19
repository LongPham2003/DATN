package com.example.shoes.repository;

import com.example.shoes.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhachHangRepo extends JpaRepository<KhachHang, Integer> {
    @Query(value = "select kh  from KhachHang kh where" +
            " (kh.hoTen like %:keyword% or kh.sdt like %:keyword or kh.email like %:keyword%)" +
            " and (:trangThai is null or kh.trangThai=:trangThai)")
    Page<KhachHang> getKhachHang(Pageable pageable, String keyword,Boolean trangThai);
    boolean existsByEmail(String email);
    boolean existsBySdt(String sdt);

    @Query("SELECT kh.ma FROM KhachHang kh ORDER BY kh.ma DESC")
    List<String> findTopMaNhanVien();
}
