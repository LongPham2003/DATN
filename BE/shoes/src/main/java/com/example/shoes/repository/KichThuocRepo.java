package com.example.shoes.repository;

import com.example.shoes.entity.DeGiay;
import com.example.shoes.entity.KichThuoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KichThuocRepo extends JpaRepository<KichThuoc, Integer> {

    List<KichThuoc> findByKichThuocContainingIgnoreCase(String kichThuoc);
    List<KichThuoc> findByKichThuocContainingIgnoreCaseAndTrangThai(String kichThuoc, Boolean trangThai);
    List<KichThuoc> findByTrangThai(Boolean trangThai);

    @Query(value = "select kt  from KichThuoc kt where kt.kichThuoc like %:keyword% order by kt.id desc")
    Page<KichThuoc> getKichThuoc(Pageable pageable, String keyword);
    boolean existsByKichThuoc(String kichThuoc);

}

