package com.example.shoes.repository;

import com.example.shoes.entity.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HinhAnhRepo extends JpaRepository<HinhAnh, Integer> {
}
