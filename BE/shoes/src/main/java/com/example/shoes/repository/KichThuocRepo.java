package com.example.shoes.repository;


import com.example.shoes.entity.KichThuoc;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KichThuocRepo extends JpaRepository<KichThuoc, Integer> {

    List<KichThuoc> findByKichThuocContainingIgnoreCase(String kichThuoc);
    List<KichThuoc> findByKichThuocContainingIgnoreCaseAndTrangThai(String kichThuoc, Boolean trangThai);
    List<KichThuoc> findByTrangThai(Boolean trangThai);
    @Modifying
    @Transactional
    @Query("UPDATE KichThuoc kt SET kt.trangThai = false WHERE kt.id = :id")
    void DeleteKichThuoc(@Param("id") Integer id);
    @Query(value = "select kt  from KichThuoc kt where kt.trangThai=true and kt.kichThuoc like %:keyword% order by kt.id desc")
    Page<KichThuoc> getKichThuoc(Pageable pageable, String keyword);
    boolean existsByKichThuoc(String kichThuoc);

}

