package com.example.shoes.repository;


import com.example.shoes.entity.MauSac;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface MauSacRepo extends JpaRepository<MauSac, Integer> {

    List<MauSac> findByTenContainingIgnoreCase(String ten);
    List<MauSac> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<MauSac> findByTrangThai(Boolean trangThai);
    @Modifying
    @Transactional
    @Query("UPDATE MauSac ms SET ms.trangThai = false WHERE ms.id = :id")
    void DeleteMauSac(@Param("id") Integer id);
    @Query(value = "select ms from MauSac ms where ms.trangThai=true and ms.ten like %:keyword% order by ms.id desc")
    Page<MauSac> getMauSac(Pageable pageable, String keyword);
    boolean existsByTen(String ten);

}
