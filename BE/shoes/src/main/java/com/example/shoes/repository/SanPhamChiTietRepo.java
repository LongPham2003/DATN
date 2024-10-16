package com.example.shoes.repository;

import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet, Integer>  {
    // Phương thức lấy danh sach với phân trang
    @Query(value = "SELECT sp FROM SanPhamChiTiet sp WHERE sp.trangThai = true order by sp.id desc")
    Page<SanPhamChiTiet> getSanPhamChiTiet(Pageable pageable);
//   loc san pham chi tiet theo ten thuoc tinh
    @Query("SELECT s FROM SanPhamChiTiet s \n" +
            "WHERE (:idSanPham IS NULL OR s.idSanPham.id= :idSanPham) \n" +
            "AND (:idMauSac IS NULL OR s.idMauSac.id= :idMauSac) \n" +
            "AND (:idkichThuoc IS NULL OR s.idKichThuoc.id= :idkichThuoc) \n" +
            "AND (:idChatLieu IS NULL OR s.idChatLieu.id= :idChatLieu) \n" +
            "AND (:idThuongHieu IS NULL OR s.idThuongHieu.id= :idThuongHieu) \n" +
            "AND (:idDeGiay IS NULL OR s.idDeGiay.id= :idDeGiay) \n" +
            "AND (:trangThai IS NULL OR s.trangThai = :trangThai) \n" +
            "AND (:minDonGia IS NULL OR s.donGia >= :minDonGia) \n" +
            "AND (:maxDonGia IS NULL OR s.donGia <= :maxDonGia)")
    List<SanPhamChiTiet> locSanPhamChiTietList(
            @Param("idSanPham") Integer idSanPham,
            @Param("idMauSac") Integer idMauSac,
            @Param("idkichThuoc") Integer idkichThuoc,
            @Param("idChatLieu") Integer idChatLieu,
            @Param("idThuongHieu") Integer idThuongHieu,
            @Param("idDeGiay") Integer idDeGiay,
            @Param("trangThai") Boolean trangThai,
            @Param("minDonGia") BigDecimal minDonGia,
            @Param("maxDonGia") BigDecimal maxDonGia);


}

