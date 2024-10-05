package com.example.shoes.repository;


import com.example.shoes.entity.Loai;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LoaiRepo extends JpaRepository<Loai, Integer> {

    List<Loai> findByTenContainingIgnoreCase(String ten);
    List<Loai> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<Loai> findByTrangThai(Boolean trangThai);
    @Modifying
    @Transactional
    @Query("UPDATE Loai l SET l.trangThai = false WHERE l.id = :id")
    void DeleteLoai(@Param("id") Integer id);
    @Query(value = "select l  from Loai l where l.trangThai=true and l.ten like %:keyword% order by l.id desc")
    Page<Loai> getLoai(Pageable pageable, String keyword);
    boolean existsByTen(String ten);
}
