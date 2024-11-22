package com.example.shoes.repository;

import com.example.shoes.entity.PhuongThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhuongThucThanhToanRepo extends JpaRepository<PhuongThucThanhToan, Integer> {
}
