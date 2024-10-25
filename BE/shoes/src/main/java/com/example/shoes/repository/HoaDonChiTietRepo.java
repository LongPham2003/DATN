package com.example.shoes.repository;

import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HoaDonChiTietRepo extends JpaRepository<HoaDonChiTiet, Integer> {
    // Tìm chi tiết hóa đơn theo hóa đơn và sản phẩm chi tiết
    @Query("SELECT hdc FROM HoaDonChiTiet hdc WHERE hdc.idHoaDon = ?1 AND hdc.idSpct = ?2")
    HoaDonChiTiet findByHoaDonAndSanPhamChiTiet(HoaDon hoaDon, SanPhamChiTiet spct);
//     lấy ra danh sach hóa đơn chi tiết theo id hóa đơn
    @Query("SELECT h FROM HoaDonChiTiet h WHERE h.idHoaDon.id = :idHoaDon")
    List<HoaDonChiTiet> findByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);

    @Query("SELECT new com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose(hdct.id, hdct.idHoaDon.id, hdct.idSpct.idSanPham.id, hdct.idSpct.idSanPham.tenSanPham,hdct.idSpct.idSanPham.ma, hdct.idSpct.idChatLieu.ten, hdct.idSpct.idMauSac.ten, hdct.idSpct.idKichThuoc.kichThuoc, hdct.idSpct.idThuongHieu.ten, hdct.idSpct.idDeGiay.ten,hdct.donGia, hdct.soLuong)FROM HoaDonChiTiet hdct WHERE hdct.idHoaDon.id = :idHoaDon")
    List<HoaDonChiTietBHRespose> getSPCTByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);

}
