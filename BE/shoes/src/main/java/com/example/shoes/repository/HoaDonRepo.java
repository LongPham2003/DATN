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

        @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThai = 'CHO_XAC_NHAN' ")
        List<HoaDon> getAllTrangThaiChuaThanhToan();

        // Query để lấy mã hóa đơn lớn nhất
        @Query("SELECT s.ma FROM HoaDon s ORDER BY s.ma DESC LIMIT 1")
        String findMaxMaHoaDon();

        @Query("SELECT h.idKhachHang.id, h.idPhieuGiamGia.id, h.tongTien, h.tienDuocGiam, h.tienPhaiThanhToan FROM HoaDon h WHERE h.id = :idHoaDon")
        List<Object[]> findTotalsByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);

        // Lay id Hoa Da Thanh Toan lon nhat
        @Query("select hd.id  from HoaDon hd where hd.trangThai = 'DA_THANH_TOAN' order by hd.id desc limit 1")
        Integer idHoaDon();

        // lấy hóa dơn theo ma phan trang loc
        @Query(value = "select  hd.id ,hd.create_at,hd.create_by,hd.update_at,hd.update_by ,hd.dia_chi_giao_hang ,hd.phi_van_chuyen, "
                        +
                        "hd.ma,hd.phuong_thuc_giao_hang ,hd.ten_khach_hang, hd.phuong_thuc_thanh_toan , hd.so_dien_thoai,hd.ngay_du_kien ,"
                        +
                        "hd.tien_duoc_giam ,hd.tien_phai_thanh_toan ,hd.tong_tien,hd.id_khach_hang,hd.id_nhan_vien ,hd.id_phieu_giam_gia ,"
                        +
                        "hd.tien_khach_dua ,hd.tien_thua ,hd.trang_thai " +
                        " from  hoa_don hd " +
                        "left  join  khach_hang kh on kh.id = hd.id_khach_hang " +
                        "left  join  nhan_vien nv on nv.id = hd.id_nhan_vien " +
                        "left  join  phieu_giam_gia pgg on pgg.id= hd.id_phieu_giam_gia " +
                        "where (hd.ma like %:keyword%  or  kh.ho_ten like %:keyword% or kh.sdt like %:keyword%) " +
                        "AND (:trangThai is null or hd.trang_thai = :trangThai)" +
                        "AND (:phuongThucGiaoHang is null or hd.phuong_thuc_giao_hang =:phuongThucGiaoHang)" +
                        "order by  hd.create_at desc ", nativeQuery = true)
        Page<HoaDon> getAll(Pageable pageable, String keyword, String phuongThucGiaoHang, String trangThai);

}
