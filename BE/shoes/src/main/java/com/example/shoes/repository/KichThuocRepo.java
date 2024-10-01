package com.example.shoes.repository;

import com.example.shoes.entity.DeGiay;
import com.example.shoes.entity.KichThuoc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KichThuocRepo extends JpaRepository<KichThuoc, Integer> {
    List<KichThuoc> findByKichThuocContainingIgnoreCase(String kichThuoc);
    List<KichThuoc> findByKichThuocContainingIgnoreCaseAndTrangThai(String kichThuoc, Boolean trangThai);
    List<KichThuoc> findByTrangThai(Boolean trangThai);
}
