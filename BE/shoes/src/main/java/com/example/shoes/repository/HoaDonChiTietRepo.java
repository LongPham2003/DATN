package com.example.shoes.repository;

import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.enums.TrangThai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface HoaDonChiTietRepo extends JpaRepository<HoaDonChiTiet, Integer> {
    // Tìm chi tiết hóa đơn theo hóa đơn và sản phẩm chi tiết
    @Query("SELECT hdc FROM HoaDonChiTiet hdc WHERE hdc.idHoaDon = ?1 AND hdc.idSpct = ?2")
    HoaDonChiTiet findByHoaDonAndSanPhamChiTiet(HoaDon hoaDon, SanPhamChiTiet spct);
//     lấy ra danh sach hóa đơn chi tiết theo id hóa đơn
    @Query("SELECT h FROM HoaDonChiTiet h WHERE h.idHoaDon.id = :idHoaDon")
    List<HoaDonChiTiet> findByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);

    @Query("SELECT new com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose(hdct.id, hdct.idHoaDon.id, hdct.idSpct.id, hdct.idSpct.idSanPham.tenSanPham,hdct.idSpct.ma, hdct.idSpct.idChatLieu.ten, hdct.idSpct.idMauSac.ten, hdct.idSpct.idKichThuoc.kichThuoc, hdct.idSpct.idThuongHieu.ten, hdct.idSpct.idDeGiay.ten,hdct.donGia, hdct.soLuong)FROM HoaDonChiTiet hdct WHERE hdct.idHoaDon.id = :idHoaDon order by  hdct.id desc ")
    List<HoaDonChiTietBHRespose> getSPCTByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);


    // Xóa một chi tiết hóa đơn theo idHoaDon và idSpct
    @Modifying
    @Transactional
    @Query("DELETE FROM HoaDonChiTiet h WHERE h.idHoaDon.id = :idHoaDon AND h.idSpct.id = :idSpct")
    void deleteByIdHoaDonAndIdSpct(@Param("idHoaDon") Integer idHoaDon, @Param("idSpct") Integer idSpct);

    List<HoaDonChiTiet> findByIdSpctAndTrangThaiIn(SanPhamChiTiet sanPhamChiTiet, List<TrangThai> trangThaiList);
    List<HoaDonChiTiet> findByIdHoaDon_IdAndIdSpct_Id(Integer idHoaDon, Integer idSpct);

}
