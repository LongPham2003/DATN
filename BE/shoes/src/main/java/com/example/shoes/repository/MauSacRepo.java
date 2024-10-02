package com.example.shoes.repository;

import com.example.shoes.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface MauSacRepo extends JpaRepository<MauSac, Integer> {
    @Query(value = "select ms from MauSac ms where ms.ten like %:keyword% order by ms.id desc")
    Page<MauSac> getMauSac(Pageable pageable, String keyword);
    boolean existsByTen(String ten);
}
