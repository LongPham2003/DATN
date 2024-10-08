package com.example.shoes.repository;

import com.example.shoes.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepo extends JpaRepository<TaiKhoan, Integer> {
    Boolean existsByEmail(String email);
    Optional<TaiKhoan> findByEmail(String email);
}
