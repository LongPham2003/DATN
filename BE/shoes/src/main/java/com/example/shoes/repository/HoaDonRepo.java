package com.example.shoes.repository;
import com.example.shoes.dto.BaoCaoThongKeResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
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

    @Query("SELECT " +
            "SUM(h.tienPhaiThanhToan), " + // Tổng số tiền khách hàng phải thanh toán
            "SUM(h.tongTien - h.tienPhaiThanhToan), " + // Giả định rằng đây là tổng chi phí (tổng tiền - tiền phải thanh toán)
            "(SUM(h.tienPhaiThanhToan) - SUM(h.tongTien - h.tienPhaiThanhToan)), " + // Lợi nhuận (tiền phải thanh toán - chi phí)
            "COUNT(h.id), " + // Số lượng hóa đơn
            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá được áp dụng cho hóa đơn
            "COUNT(DISTINCT h.idKhachHang), " + // Số lượng khách hàng duy nhất đã thực hiện hóa đơn
            "h.ngayTao " + // Ngày tạo hóa đơn
            "FROM HoaDon h " + // Từ bảng HoaDon
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " + // Điều kiện lọc theo ngày
            "GROUP BY h.ngayTao " + // Nhóm theo ngày tạo
            "ORDER BY h.ngayTao") // Sắp xếp kết quả theo ngày tạo
    List<Object[]> layBaoCaoTaiChinhTheoNgay(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("SELECT " +
            "SUM(h.tienPhaiThanhToan), " + // Tổng số tiền khách hàng phải thanh toán
            "SUM(h.tongTien - h.tienPhaiThanhToan), " + // Tổng chi phí
            "(SUM(h.tienPhaiThanhToan) - SUM(h.tongTien - h.tienPhaiThanhToan)), " + // Lợi nhuận
            "COUNT(h.id), " + // Số lượng hóa đơn
            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá
            "COUNT(DISTINCT h.idKhachHang), " + // Số lượng khách hàng duy nhất
            "YEAR(h.ngayTao), MONTH(h.ngayTao) " + // Năm và tháng của ngày tạo hóa đơn
            "FROM HoaDon h " + // Từ bảng HoaDon
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " + // Điều kiện lọc theo ngày
            "GROUP BY YEAR(h.ngayTao), MONTH(h.ngayTao) " + // Nhóm theo năm và tháng
            "ORDER BY YEAR(h.ngayTao), MONTH(h.ngayTao)") // Sắp xếp kết quả theo năm và tháng
    List<Object[]> layBaoCaoTaiChinhTheoThang(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("SELECT " +
            "SUM(h.tienPhaiThanhToan), " + // Tổng số tiền khách hàng phải thanh toán
            "SUM(h.tongTien - h.tienPhaiThanhToan), " + // Tổng chi phí
            "(SUM(h.tienPhaiThanhToan) - SUM(h.tongTien - h.tienPhaiThanhToan)), " + // Lợi nhuận
            "COUNT(h.id), " + // Số lượng hóa đơn
            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá
            "COUNT(DISTINCT h.idKhachHang), " + // Số lượng khách hàng duy nhất
            "YEAR(h.ngayTao) " + // Năm của ngày tạo hóa đơn
            "FROM HoaDon h " + // Từ bảng HoaDon
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " + // Điều kiện lọc theo ngày
            "GROUP BY YEAR(h.ngayTao) " + // Nhóm theo năm
            "ORDER BY YEAR(h.ngayTao)") // Sắp xếp kết quả theo năm
    List<Object[]> layBaoCaoTaiChinhTheoNam(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT " +
            "SUM(h.tienPhaiThanhToan), " + // Tổng số tiền khách hàng phải thanh toán
            "SUM(h.tongTien - h.tienPhaiThanhToan), " + // Tổng chi phí
            "(SUM(h.tienPhaiThanhToan) - SUM(h.tongTien - h.tienPhaiThanhToan)), " + // Lợi nhuận
            "COUNT(h.id), " + // Số lượng hóa đơn
            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá
            "COUNT(DISTINCT h.idKhachHang) " + // Số lượng khách hàng duy nhất
            "FROM HoaDon h") // Từ bảng HoaDon
    List<Object[]> layBaoCaoTaiChinhTongQuoc();



}
