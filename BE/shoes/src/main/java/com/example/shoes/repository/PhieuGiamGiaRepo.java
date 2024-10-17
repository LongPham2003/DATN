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
import java.util.List;

@Repository
public interface PhieuGiamGiaRepo extends JpaRepository<PhieuGiamGia, Integer> {

    boolean existsById(Integer id);

    List<PhieuGiamGia> findByTenVoucherContainingIgnoreCase(String tenVoucher);

    List<PhieuGiamGia> findByTrangThai(Boolean trangThai);

    @Query("SELECT p FROM PhieuGiamGia p WHERE "
            + "(:tenVoucher IS NULL OR LOWER(p.tenVoucher) LIKE LOWER(CONCAT('%', :tenVoucher, '%'))) "
            + "AND (:dieuKienGiam IS NULL OR LOWER(p.dieuKienGiamGia) LIKE LOWER(CONCAT('%', :dieuKienGiam, '%'))) "
            + "AND (:trangThai IS NULL OR p.trangThai = :trangThai) "
            + "AND (:startDate IS NULL OR p.ngayBatDau >= :startDate) "
            + "AND (:endDate IS NULL OR p.ngayKetThuc <= :endDate) "
            + "ORDER BY p.id DESC")
    Page<PhieuGiamGia> searchPhieuGiamGia(
            Pageable pageable,
            @Param("tenVoucher") String tenVoucher,
            @Param("dieuKienGiam") String dieuKienGiamGiaGia,
            @Param("trangThai") Boolean trangThai,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
