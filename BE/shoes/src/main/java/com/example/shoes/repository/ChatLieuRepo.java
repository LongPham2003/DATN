package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.DeGiay;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatLieuRepo extends JpaRepository<ChatLieu, Integer> {
    List<ChatLieu>findByTenContainingIgnoreCase(String ten);
    List<ChatLieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<ChatLieu> findByTrangThai(Boolean trangThai);
    @Modifying
    @Transactional
    @Query("UPDATE ChatLieu cl SET cl.trangThai = false WHERE cl.id = :id")
    void DeleteChatLieu(@Param("id") Integer id);

    @Query(value = "SELECT cl FROM ChatLieu cl WHERE cl.trangThai = true AND cl.ten LIKE %:keyword% order by cl.id desc")
    Page<ChatLieu> getChatLieu(Pageable pageable,  String keyword);
    boolean existsByTen(String ten);
}
