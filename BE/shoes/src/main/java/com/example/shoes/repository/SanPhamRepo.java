package com.example.shoes.repository;

import com.example.shoes.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SanPhamRepo extends JpaRepository<SanPham, Integer> {
}
