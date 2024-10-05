package com.example.shoes.repository;

import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet, Integer> {

}
