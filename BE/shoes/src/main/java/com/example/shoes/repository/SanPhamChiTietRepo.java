package com.example.shoes.repository;

import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet, Integer> {
    // Phương thức lấy danh sach với phân trang
    @Query(value = "SELECT sp FROM SanPhamChiTiet sp WHERE sp.trangThai = true order by sp.id desc")
    Page<SanPhamChiTiet> getSanPham(Pageable pageable);
    @Query("SELECT s FROM SanPhamChiTiet s WHERE "
            + "(:sanPham IS NULL OR s.idSanPham.tenSanPham = :sanPham) AND "
            + "(:mauSac IS NULL OR s.idMauSac.ten = :mauSac) AND "
            + "(:kichThuoc IS NULL OR s.idKichThuoc.kichThuoc = :kichThuoc) AND "
            + "(:chatLieu IS NULL OR s.idChatLieu.ten = :chatLieu) AND "
            + "(:thuongHieu IS NULL OR s.idThuongHieu.ten = :thuongHieu) AND "
            + "(:deGiay IS NULL OR s.idDeGiay.ten = :deGiay) AND "
            + "(s.trangThai = :trangThai)")
    List<SanPhamChiTiet> locSanPhamChiTiet(
            @Param("sanPham") String sanPham,
            @Param("mauSac") String mauSac,
            @Param("kichThuoc") String kichThuoc,
            @Param("chatLieu") String chatLieu,
            @Param("thuongHieu") String thuongHieu,
            @Param("deGiay") String deGiay,
            @Param("trangThai") boolean trangThai);
}
