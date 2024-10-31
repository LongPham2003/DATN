package com.example.shoes.repository;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HoaDonRepo extends JpaRepository<HoaDon, Integer> {
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = 'DA_THANH_TOAN'")
    List<HoaDon> getAllTrangThaiDaThanhToan();
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = 'CHUA_THANH_TOAN' ")
    List<HoaDon> getAllTrangThaiChuaThanhToan();
    // Query để lấy mã hóa đơn lớn nhất
    @Query("SELECT s.ma FROM HoaDon s ORDER BY s.ma DESC LIMIT 1")
    String findMaxMaHoaDon();

    @Query("SELECT h.tongTien, h.tienDuocGiam, h.tienPhaiThanhToan FROM HoaDon h WHERE h.id = :idHoaDon")
    List<Object[]> findTotalsByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);

}
