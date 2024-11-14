package com.example.shoes.repository;

import com.example.shoes.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SanPhamRepo extends JpaRepository<SanPham, Integer> {
        // tim kiem va phan trang
    @Query("SELECT sp FROM SanPham sp JOIN sp.loai lo " +
            "WHERE (:keyword IS NULL OR sp.tenSanPham LIKE %:keyword%) " +
            "AND (:idLoai IS NULL OR lo.id= :idLoai) " +
            "AND (:trangThai IS NULL OR sp.trangThai = :trangThai) " +

            "ORDER BY sp.trangThai desc , sp.id DESC")

    Page<SanPham> getSanPham(@Param("keyword") String keyword,
                                @Param("idLoai") Integer idLoai,
                                @Param("trangThai") Boolean trangThai,
                                Pageable pageable);

    boolean existsByTenSanPham(String ten);

    // Query để lấy mã sản phẩm lớn nhất
    @Query("SELECT s.ma FROM SanPham s ORDER BY s.ma DESC LIMIT 1")
    String findMaxMaSanPham();

     // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT sp FROM SanPham sp WHERE sp.trangThai = true")
    List<SanPham> getAllTrangThaiTrue();

    @Query(value = "SELECT sp.id AS idsp, sp.ma, sp.ten_san_pham AS tenSanPham, SUM(hdc.so_luong) AS tongSoLuong " +
            "FROM san_pham sp " +
            "JOIN san_pham_chi_tiet spct ON sp.id = spct.id_san_pham " +
            "JOIN hoa_don_chi_tiet hdc ON spct.id = hdc.id_spct " +
            "JOIN hoa_don hd ON hdc.id_hoa_don = hd.id " +
            "WHERE MONTH(hd.ngay_tao) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) " +
            "  AND YEAR(hd.ngay_tao) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) " +
            "  AND hd.trang_thai = 'DA_THANH_TOAN' " +
            "GROUP BY sp.id " +
            "ORDER BY SUM(hdc.so_luong) DESC " +
            "LIMIT 3",
            nativeQuery = true)
    List<Object[]> findTop3SanPhamBanChayTrongThangHienTai();
}
