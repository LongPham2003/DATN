package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.DeGiay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatLieuRepo extends JpaRepository<ChatLieu, Integer> {
    List<ChatLieu>findByTenContainingIgnoreCase(String ten);
    List<ChatLieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<ChatLieu> findByTrangThai(Boolean trangThai);
    @Query(value = "select dg  from DeGiay dg where dg.ten like %:keyword% order by dg.id desc")
    Page<ChatLieu> getChatLieu(Pageable pageable, String keyword);
    boolean existsByTen(String ten);
}
