package com.example.shoes.repository;

import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet, Integer> {
    // Phương thức lấy danh sach với phân trang
    @Query(value = "SELECT sp FROM SanPhamChiTiet sp WHERE sp.trangThai = true order by sp.id desc")
    Page<SanPhamChiTiet> getSanPham(Pageable pageable);
}
