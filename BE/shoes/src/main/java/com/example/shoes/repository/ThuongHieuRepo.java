package com.example.shoes.repository;


import com.example.shoes.entity.ThuongHieu;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThuongHieuRepo extends JpaRepository<ThuongHieu, Integer> {
    List<ThuongHieu> findByTenContainingIgnoreCase(String ten);
    List<ThuongHieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<ThuongHieu> findByTrangThai(Boolean trangThai);
    @Modifying
    @Transactional
    @Query("UPDATE ThuongHieu th SET th.trangThai = false WHERE th.id = :id")
    void DeleteThuongHieu(@Param("id") Integer id);
    @Query(value = "select th from ThuongHieu th where th.trangThai=true and th.ten like %:keyword% order by th.id desc")
    Page<ThuongHieu> getThuongHieu(Pageable pageable, String keyword);
    boolean existsByTen(String ten);
}
