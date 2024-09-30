package com.example.shoes.repository;

import com.example.shoes.entity.Loai;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoaiRepo extends JpaRepository<Loai, Integer> {
}
