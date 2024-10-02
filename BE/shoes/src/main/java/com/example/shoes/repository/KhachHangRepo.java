package com.example.shoes.repository;

import com.example.shoes.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepo extends JpaRepository<KhachHang, Integer> {
    @Query(value = "select kh  from KhachHang kh where (kh.hoTen like %:keyword%) or kh.sdt like %:keyword or kh.email like %:keyword%")
    Page<KhachHang> getKhachHang(Pageable pageable, String keyword);
    boolean existsByEmail(String email);
}
