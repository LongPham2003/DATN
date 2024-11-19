package com.example.shoes.repository;

import com.example.shoes.dto.BaoCaoThongKeResponse;

import com.example.shoes.dto.hoadon.response.HoaDonResponse;

import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;

import com.example.shoes.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT h.idKhachHang.id, h.idPhieuGiamGia.id, h.tongTien, h.tienDuocGiam, h.tienPhaiThanhToan FROM HoaDon h WHERE h.id = :idHoaDon")
    List<Object[]> findTotalsByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);



    @Query("SELECT " +
            "SUM(h.tienPhaiThanhToan), " + // Tổng số tiền khách hàng phải thanh toán
            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá được áp dụng cho hóa đơn
            "COUNT(h.id), " + // Số lượng hóa đơn
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

            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá
            "COUNT(h.id), " + // Số lượng hóa đơn

            "COUNT(DISTINCT h.idKhachHang), " + // Số lượng khách hàng duy nhất
            "YEAR(h.ngayTao) " + // Năm của ngày tạo hóa đơn
            "FROM HoaDon h " + // Từ bảng HoaDon
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " + // Điều kiện lọc theo ngày
            "GROUP BY YEAR(h.ngayTao) " + // Nhóm theo năm
            "ORDER BY YEAR(h.ngayTao)") // Sắp xếp kết quả theo năm
    List<Object[]> layBaoCaoTaiChinhTheoNam(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT " +
            "SUM(h.tienPhaiThanhToan), " + // Tổng số tiền khách hàng phải thanh toán

            "SUM(h.tienDuocGiam), " + // Tổng tiền giảm giá
            "COUNT(h.id), " + // Số lượng hóa đơn

            "COUNT(DISTINCT h.idKhachHang) " + // Số lượng khách hàng duy nhất
            "FROM HoaDon h") // Từ bảng HoaDon
    List<Object[]> layBaoCaoTaiChinhTongQuoc();


    //Lay id Hoa Da Thanh Toan lon nhat
    @Query("select hd.id  from HoaDon hd where hd.trangThai = 'DA_THANH_TOAN' order by hd.id desc limit 1")
    Integer idHoaDon();


    // lấy hóa dơn theo ma phan trang loc
    @Query( value = "select  hd.id ,hd.create_at,hd.create_by,hd.update_at,hd.update_by ,hd.dia_chi_giao_hang ,hd.phi_van_chuyen, " +
            "hd.ma,hd.ngay_sua ,hd.ngay_tao ,hd.phuong_thuc_giao_hang , hd.phuong_thuc_thanh_toan , hd.so_dien_thoai ," +
            "hd.tien_duoc_giam ,hd.tien_phai_thanh_toan ,hd.tong_tien,hd.id_khach_hang,hd.id_nhan_vien ,hd.id_phieu_giam_gia ," +
            "hd.tien_khach_dua ,hd.tien_thua ,hd.trang_thai " +
            " from  hoa_don hd " +
            "left  join  khach_hang kh on kh.id = hd.id_khach_hang " +
            "left  join  nhan_vien nv on nv.id = hd.id_nhan_vien " +
            "left  join  phieu_giam_gia pgg on pgg.id= hd.id_phieu_giam_gia " +
            "where (hd.ma like %:keyword%  or  kh.ho_ten like %:keyword% or kh.sdt like %:keyword%) " +
            "AND (:trangThai is null or hd.trang_thai = :trangThai)" +
            "AND (:phuongThucGiaoHang is null or hd.phuong_thuc_giao_hang =:phuongThucGiaoHang)" +
            "order by  hd.create_at desc "
            ,nativeQuery = true)
    Page<HoaDon> getAll(Pageable pageable,String keyword,String phuongThucGiaoHang,String trangThai);



}
