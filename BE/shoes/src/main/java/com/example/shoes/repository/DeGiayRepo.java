package com.example.shoes.repository;


import com.example.shoes.entity.DeGiay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeGiayRepo extends JpaRepository<DeGiay, Integer> {
    List<DeGiay>findByTenContainingIgnoreCase(String ten);
    List<DeGiay> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    List<DeGiay> findByTrangThai(Boolean trangThai);
}
