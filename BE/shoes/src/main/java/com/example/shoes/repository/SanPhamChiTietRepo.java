package com.example.shoes.repository;

import com.example.shoes.dto.sanphamchitiet.response.KichThuocMauSacResponse;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietDetailResponse;
import com.example.shoes.entity.KichThuoc;
import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
@Repository
public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet, Integer> {

    //   loc san pham chi tiet theo ten thuoc tinh va danh sach spct
    @Query("SELECT s FROM SanPhamChiTiet s " +
            "WHERE (:idSanPham IS NULL OR s.idSanPham.id = :idSanPham) " +
            "AND (:idMauSac IS NULL OR s.idMauSac.id = :idMauSac) " +
            "AND (:idkichThuoc IS NULL OR s.idKichThuoc.id = :idkichThuoc) " +
            "AND (:idChatLieu IS NULL OR s.idChatLieu.id = :idChatLieu) " +
            "AND (:idThuongHieu IS NULL OR s.idThuongHieu.id = :idThuongHieu) " +
            "AND (:idDeGiay IS NULL OR s.idDeGiay.id = :idDeGiay) " +
            "AND (:trangThai IS NULL OR s.trangThai = :trangThai) " +
            "AND (:minDonGia IS NULL OR s.donGia >= :minDonGia) " +
            "AND (:maxDonGia IS NULL OR s.donGia <= :maxDonGia) " +
            "ORDER BY s.trangThai DESC, s.id DESC")
    Page<SanPhamChiTiet> getspctAndLocspct(
            @Param("idSanPham") Integer idSanPham,
            @Param("idMauSac") Integer idMauSac,
            @Param("idkichThuoc") Integer idkichThuoc,
            @Param("idChatLieu") Integer idChatLieu,
            @Param("idThuongHieu") Integer idThuongHieu,
            @Param("idDeGiay") Integer idDeGiay,
            @Param("trangThai") Boolean trangThai,
            @Param("minDonGia") BigDecimal minDonGia,
            @Param("maxDonGia") BigDecimal maxDonGia,
            Pageable pageable);

    // Tính tổng số lượng SanPhamChiTiet theo idSanPham
    @Query("SELECT SUM(s.soLuong) FROM SanPhamChiTiet s WHERE s.idSanPham.id= :idSanPham")
    Integer sumSoLuongByIdSanPham(@Param("idSanPham") Integer idSanPham);

    // lay tat ca  spct theo idsanpham va co trang thai la true
    @Query("SELECT spct FROM SanPhamChiTiet spct WHERE spct.idSanPham.id = :idSanPham AND spct.trangThai = true")
    List<SanPhamChiTiet> findByIdSanPhamAndTrangThaiTrue(@Param("idSanPham") Integer idSanPham);

    // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT spct FROM SanPhamChiTiet spct " +
            "WHERE (:maSanPham IS NULL OR spct.idSanPham.tenSanPham  LIKE %:maSanPham%) " +
            "AND (:idMauSac IS NULL OR spct.idMauSac.id = :idMauSac) " +
            "AND (:idkichThuoc IS NULL OR spct.idKichThuoc.id = :idkichThuoc) " +
            "AND (:idChatLieu IS NULL OR spct.idChatLieu.id = :idChatLieu) " +
            "AND (:idThuongHieu IS NULL OR spct.idThuongHieu.id = :idThuongHieu) " +
            "AND (:idDeGiay IS NULL OR spct.idDeGiay.id = :idDeGiay) " +
            "AND (spct.idSanPham.trangThai = true) " +
            "AND (spct.trangThai = true) and  spct.soLuong>0"+ "ORDER BY spct.id DESC")
    List<SanPhamChiTiet> getAllTrangThaiTrue(@Param("maSanPham") String maSanPham,
                                             @Param("idMauSac") Integer idMauSac,
                                             @Param("idkichThuoc") Integer idkichThuoc,
                                             @Param("idChatLieu") Integer idChatLieu,
                                             @Param("idThuongHieu") Integer idThuongHieu,
                                             @Param("idDeGiay") Integer idDeGiay);

    @Query("select  spct FROM SanPhamChiTiet spct where spct.id = :idSPCT")
    SanPhamChiTiet getSPCTDetail(@Param("idSPCT") Integer idSPCT);

    @Query("SELECT s.ma FROM SanPhamChiTiet s ORDER BY s.ma DESC LIMIT 1")
    String findMaxMaSanPhamChiTiet();

//loc kich thuoc và mau sac theo ten
@Query("SELECT spct FROM SanPhamChiTiet spct " +
        "WHERE spct.idSanPham.id = :idSanPham " +
        "AND (:idKichThuoc IS NULL OR spct.idKichThuoc .id =:idKichThuoc) " +
        "AND (:idMauSac IS NULL OR spct.idMauSac .id = :idMauSac)")
List<SanPhamChiTiet> findSanPhamChiTiet(
        @Param("idSanPham") Integer idSanPham,
        @Param("idKichThuoc") Integer idKichThuoc,
        @Param("idMauSac") Integer idMauSac);
//lay ra top 3 san pham moi nhat
    @Query(value = "SELECT spct.* " +
            "FROM san_pham_chi_tiet spct " +
            "JOIN san_pham sp ON spct.id_san_pham = sp.id " +
            "ORDER BY sp.ngay_tao DESC " +  // Sắp xếp theo ngày tạo của sản phẩm (SanPham)
            "LIMIT 3",
            nativeQuery = true)
    List<SanPhamChiTiet> findTop3SanPhamMoiNhat();
}

