package com.example.shoes.repository;

import com.example.shoes.entity.PhieuGiamGia;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PhieuGiamGiaRepo
        extends JpaRepository<PhieuGiamGia, Integer>
{

    boolean existsById(Integer id);

    List<PhieuGiamGia> findByTenVoucherContainingIgnoreCase(String tenVoucher);

    @Query("select pgg from PhieuGiamGia  pgg where pgg.trangThai = 'Hoạt Động' order by  pgg.giamToiDa desc ")
    List<PhieuGiamGia> getAllByTrangThaiTrue();

    List<PhieuGiamGia> findByTrangThai(String trangThai);

    @Query("SELECT p FROM PhieuGiamGia p WHERE "
            + "(p.ma like %:keyword% or p.tenVoucher like %:keyword%)"
            + "AND (:trangThai IS NULL OR p.trangThai = :trangThai) "
            + "AND (:ngayBatDau IS NULL OR p.ngayBatDau >= :ngayBatDau) "
            + "AND (:ngayKetThuc IS NULL OR p.ngayKetThuc <= :ngayKetThuc) "
            + "ORDER BY p.id DESC")
    Page<PhieuGiamGia> searchPhieuGiamGia(
            Pageable pageable,
            @Param("keyword") String keyword,
            @Param("trangThai") String trangThai,
            @Param("ngayBatDau") LocalDateTime ngayBatDau,
            @Param("ngayKetThuc") LocalDateTime ngayKetThuc);

    @Query("SELECT pgg.ma FROM PhieuGiamGia pgg ORDER BY pgg.ma DESC")
    List<String> findTopMaPhieuGiamGia();

    @Query("""
                SELECT v 
                FROM PhieuGiamGia v 
                WHERE :dieuKienGiam >= v.dieuKienGiamGia 
                AND v.ngayBatDau <= CURRENT_TIMESTAMP 
                AND v.ngayKetThuc >= CURRENT_TIMESTAMP 
                AND v.soLuong > 0
                ORDER BY v.mucGiam DESC limit  1
            """)
    PhieuGiamGia findPhieuGiamGiaCoLoiNhat(@Param("dieuKienGiam") BigDecimal dieuKienGiam);
}
