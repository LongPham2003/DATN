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
            "WHERE (:tenSanPham IS NULL OR s.idSanPham.id IN (SELECT sp.id FROM SanPham sp WHERE sp.tenSanPham LIKE CONCAT('%', :tenSanPham, '%'))) \n" +
            "AND (:tenMauSac IS NULL OR s.idMauSac.id IN (SELECT ms.id FROM MauSac ms WHERE ms.ten LIKE CONCAT('%', :tenMauSac, '%'))) \n" +
            "AND (:kichThuoc IS NULL OR s.idKichThuoc.id IN (SELECT kt.id FROM KichThuoc kt WHERE kt.kichThuoc LIKE CONCAT('%', :kichThuoc, '%'))) \n" +
            "AND (:tenChatLieu IS NULL OR s.idChatLieu.id IN (SELECT cl.id FROM ChatLieu cl WHERE cl.ten LIKE CONCAT('%', :tenChatLieu, '%'))) \n" +
            "AND (:tenThuongHieu IS NULL OR s.idThuongHieu.id IN (SELECT th.id FROM ThuongHieu th WHERE th.ten LIKE CONCAT('%', :tenThuongHieu, '%'))) \n" +
            "AND (:tenDeGiay IS NULL OR s.idDeGiay.id IN (SELECT dg.id FROM DeGiay dg WHERE dg.ten LIKE CONCAT('%', :tenDeGiay, '%'))) \n" +
            "AND (:trangThai IS NULL OR s.trangThai = :trangThai) \n" +
            "AND (:minDonGia IS NULL OR s.donGia >= :minDonGia) \n" +
            "AND (:maxDonGia IS NULL OR s.donGia <= :maxDonGia)")
    List<SanPhamChiTiet> locSanPhamChiTietList(
            @Param("tenSanPham") String tenSanPham,
            @Param("tenMauSac") String tenMauSac,
            @Param("kichThuoc") String kichThuoc,
            @Param("tenChatLieu") String tenChatLieu,
            @Param("tenThuongHieu") String tenThuongHieu,
            @Param("tenDeGiay") String tenDeGiay,
            @Param("trangThai") Boolean trangThai,
            @Param("minDonGia") BigDecimal minDonGia,
            @Param("maxDonGia") BigDecimal maxDonGia);
//     xoa mem
    @Modifying
    @Transactional
    @Query("UPDATE SanPhamChiTiet sp SET sp.trangThai = false WHERE sp.id = :id")
    void UpdateTrangThai(@Param("id") Integer id);

}

