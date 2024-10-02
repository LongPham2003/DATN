package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.DeGiay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeGiayRepo extends JpaRepository<DeGiay, Integer> {
    @Query(value = "select dg  from DeGiay dg where dg.ten like %:keyword% order by dg.id desc")
    Page<DeGiay> getDeGiay(Pageable pageable, String keyword);
    boolean existsByTen(String ten);
}
