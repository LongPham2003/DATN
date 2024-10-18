package com.example.shoes.repository;

import com.example.shoes.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NhanVienRepo extends JpaRepository<NhanVien, Integer> {
    @Query(value = "select nv  from NhanVien nv where" +
            " (nv.ma like %:keyword% or nv.hoTen like %:keyword% or nv.diaChi like %:keyword or nv.email like %:keyword%)" +
            "  and (:trangThai is null or  nv.trangThai = :trangThai) order by nv.id desc")
    Page<NhanVien> getNhanVien(Pageable pageable, String keyword,Boolean trangThai);

    boolean existsByEmail(String email);

    boolean existsBySdt(String sdt);

//    NhanVien findByEmail(String email);
    Optional<NhanVien> findByEmail(String email); // Tìm nhân viên theo email
    NhanVien findById(int id);


    @Query("SELECT nv.ma FROM NhanVien nv ORDER BY nv.ma DESC")
    List<String> findTopMaSanPham();
}
