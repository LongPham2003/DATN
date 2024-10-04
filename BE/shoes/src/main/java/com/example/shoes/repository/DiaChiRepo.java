package com.example.shoes.repository;

import com.example.shoes.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaChiRepo  extends JpaRepository<DiaChi, Integer> {
}
