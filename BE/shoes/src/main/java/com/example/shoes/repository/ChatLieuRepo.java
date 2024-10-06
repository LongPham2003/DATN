package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ChatLieuRepo extends JpaRepository<ChatLieu, Integer> {
    @Query(value = "select cl  from ChatLieu cl where cl.ten like %:keyword% order by cl.id desc")
    Page<ChatLieu> getChatLieu(Pageable pageable, String keyword);
    boolean existsByTen(String ten);


}
