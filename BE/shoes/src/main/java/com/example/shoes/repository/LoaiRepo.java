package com.example.shoes.repository;

import com.example.shoes.entity.Loai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoaiRepo extends JpaRepository<Loai, Integer> {

    List<Loai> findByTenContainingIgnoreCase(String ten);
    List<Loai> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<Loai> findByTrangThai(Boolean trangThai);

}
