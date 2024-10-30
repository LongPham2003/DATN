package com.example.shoes.repository;

import com.example.shoes.entity.PhieuGiamGia;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PhieuGiamGiaRepo extends JpaRepository<PhieuGiamGia, Integer> {

    boolean existsById(Integer id);

    List<PhieuGiamGia> findByTenVoucherContainingIgnoreCase(String tenVoucher);

    List<PhieuGiamGia> findByTrangThai(Boolean trangThai);

    @Query("SELECT p FROM PhieuGiamGia p WHERE "
            + "(:tenVoucher IS NULL OR LOWER(p.tenVoucher) LIKE LOWER(CONCAT('%', :tenVoucher, '%'))) "
            + "AND (:trangThai IS NULL OR p.trangThai = :trangThai) "
            + "AND (:ngayBatDau IS NULL OR p.ngayBatDau >= :ngayBatDau) "
            + "AND (:ngayKetThuc IS NULL OR p.ngayKetThuc <= :ngayKetThuc) "
            + "ORDER BY p.id DESC")
    Page<PhieuGiamGia> searchPhieuGiamGia(
            Pageable pageable,
            @Param("tenVoucher") String tenVoucher,
            @Param("trangThai") Boolean trangThai,
            @Param("ngayBatDau") LocalDateTime ngayBatDau,
            @Param("ngayKetThuc") LocalDateTime ngayKetThuc);
}
