package com.example.shoes.repository;

import com.example.shoes.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThuongHieuRepo extends JpaRepository<ThuongHieu, Integer> {
    List<ThuongHieu> findByTenContainingIgnoreCase(String ten);
    List<ThuongHieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<ThuongHieu> findByTrangThai(Boolean trangThai);
}
