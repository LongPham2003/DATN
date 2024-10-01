package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatLieuRepo extends JpaRepository<ChatLieu, Integer> {
    List<ChatLieu> findByTenContainingIgnoreCase(String ten);
    List<ChatLieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<ChatLieu> findByTrangThai(Boolean trangThai);
}
