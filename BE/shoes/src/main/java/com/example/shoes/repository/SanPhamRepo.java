package com.example.shoes.repository;


import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SanPhamRepo extends JpaRepository<SanPham, Integer> {
    @Query(value = "SELECT sp FROM SanPham sp WHERE sp.trangThai = true AND sp.tenSanPham LIKE %:keyword% order by sp.id desc")
    Page<SanPham> getSanPham(Pageable pageable, String keyword);
    boolean existsByTenSanPham(String ten);
}
