package com.example.shoes.repository;

import com.example.shoes.entity.SanPham;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SanPhamRepo extends JpaRepository<SanPham, Integer> {
        // tim kiem va phan trang
    @Query("SELECT sp FROM SanPham sp JOIN sp.loai lo " +
            "WHERE (:keyword IS NULL OR sp.tenSanPham LIKE %:keyword%) " +
            "AND (:idLoai IS NULL OR lo.id= :idLoai) " +
            "AND (:trangThai IS NULL OR sp.trangThai = :trangThai) " +
            "ORDER BY sp.trangThai desc ,sp.id DESC")
    Page<SanPham> getSanPham(@Param("keyword") String keyword,
                                @Param("idLoai") Integer idLoai,
                                @Param("trangThai") Boolean trangThai,
                                Pageable pageable);

    boolean existsByTenSanPham(String ten);


}
