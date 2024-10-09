package com.example.shoes.repository;

import com.example.shoes.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NhanVienRepo extends JpaRepository<NhanVien, Integer> {
    @Query(value = "select nv  from NhanVien nv where (nv.hoTen like %:keyword%) or nv.diaChi like %:keyword or nv.email like %:keyword% order by nv.id desc")
    Page<NhanVien> getNhanVien(Pageable pageable, String keyword);

    boolean existsByEmail(String email);

    boolean existsBySdt(String sdt);

    NhanVien findByEmail(String email);

    NhanVien findById(int id);
}
