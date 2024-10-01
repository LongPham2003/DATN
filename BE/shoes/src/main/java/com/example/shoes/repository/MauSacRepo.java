package com.example.shoes.repository;

import com.example.shoes.entity.Loai;
import com.example.shoes.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MauSacRepo extends JpaRepository<MauSac, Integer> {
    List<MauSac> findByTenContainingIgnoreCase(String ten);
    List<MauSac> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<MauSac> findByTrangThai(Boolean trangThai);
}
