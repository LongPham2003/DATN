package com.example.shoes.repository;
import com.example.shoes.entity.DeGiay;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeGiayRepo extends JpaRepository<DeGiay, Integer> {

    List<DeGiay>findByTenContainingIgnoreCase(String ten);
    List<DeGiay> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<DeGiay> findByTrangThai(Boolean trangThai);
    @Modifying
    @Transactional
    @Query("UPDATE DeGiay dg SET dg.trangThai = false WHERE dg.id = :id")
    void DeleteDeGiay(@Param("id") Integer id);
    @Query(value = "select dg  from DeGiay dg where dg.trangThai=true and dg.ten like %:keyword% order by dg.id desc")
    Page<DeGiay> getDeGiay(Pageable pageable, String keyword);
    boolean existsByTen(String ten);
}
