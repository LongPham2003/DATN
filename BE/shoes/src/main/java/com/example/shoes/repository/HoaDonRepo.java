package com.example.shoes.repository;

import com.example.shoes.dto.BaoCaoThongKeResponse;

import com.example.shoes.dto.hoadon.response.HoaDonResponse;

import com.example.shoes.dto.hoadon.response.HoaDonTheoIDKH;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;

import com.example.shoes.entity.HoaDon;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HoaDonRepo
        extends JpaRepository<HoaDon, Integer>
{
    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThaiDonHang = 'DA_THANH_TOAN'")
    List<HoaDon> getAllTrangThaiDaThanhToan();

    @Query("SELECT hd FROM HoaDon  hd WHERE hd.trangThaiThanhToan = false and hd.phuongThucGiaoHang= 'Tại quầy' and hd.trangThaiDonHang='CHO_XAC_NHAN' ")
    List<HoaDon> getAllTrangThaiChuaThanhToan();

    // Query để lấy mã hóa đơn lớn nhất
    @Query("SELECT s.ma FROM HoaDon s ORDER BY s.ma DESC LIMIT 1")
    String findMaxMaHoaDon();

    @Query("SELECT h.idKhachHang.id, h.idPhieuGiamGia.id, h.tongTien, h.tienDuocGiam, h.tienPhaiThanhToan FROM HoaDon h WHERE h.id = :idHoaDon")
    List<Object[]> findTotalsByIdHoaDon(@Param("idHoaDon") Integer idHoaDon);

    // Lay id Hoa Da Thanh Toan lon nhat
    @Query("select hd.id  from HoaDon hd where hd.trangThaiDonHang = 'DA_THANH_TOAN' order by hd.id desc limit 1")
    Integer idHoaDon();

    // lấy hóa dơn theo ma phan trang loc
    @Query(value = "select  hd.id ,hd.create_at,hd.create_by,hd.update_at,hd.update_by ,hd.dia_chi_giao_hang ,hd.phi_van_chuyen, "
            +
            "hd.ma,hd.phuong_thuc_giao_hang ,hd.ten_khach_hang, hd.phuong_thuc_thanh_toan , hd.so_dien_thoai,hd.ngay_du_kien ,"
            +
            "hd.tien_duoc_giam ,hd.tien_phai_thanh_toan ,hd.tong_tien,hd.id_khach_hang,hd.id_nhan_vien ,hd.id_phieu_giam_gia ,"
            +
            "hd.tien_khach_dua ,hd.tien_thua ,hd.trang_thai_don_hang,hd.trang_thai_thanh_toan " +
            " from  hoa_don hd " +
            "left  join  khach_hang kh on kh.id = hd.id_khach_hang " +
            "left  join  nhan_vien nv on nv.id = hd.id_nhan_vien " +
            "left  join  phieu_giam_gia pgg on pgg.id= hd.id_phieu_giam_gia " +
            "where (hd.ma like %:keyword%  or  kh.ho_ten like %:keyword% or kh.sdt like %:keyword%) " +
            "AND (:trangThai is null or hd.trang_thai_don_hang = :trangThai)" +
            "AND (:phuongThucGiaoHang is null or hd.phuong_thuc_giao_hang =:phuongThucGiaoHang)" +
            "order by  hd.create_at desc ", nativeQuery = true)
    Page<HoaDon> getAll(Pageable pageable, String keyword, String phuongThucGiaoHang, String trangThai);

    @Query(value = "select count(id) from hoa_don", nativeQuery = true)
    Integer getCountHoaDon();

    @Query(value = "select count(id) from hoa_don where trang_thai_don_hang = 'CHO_XAC_NHAN'", nativeQuery = true)
    Integer getCountHoaDonCXN();

    @Query(value = "select count(id) from hoa_don where trang_thai_don_hang = 'DA_XAC_NHAN'", nativeQuery = true)
    Integer getCountHoaDonDXN();

    @Query(value = "select count(id) from hoa_don where trang_thai_don_hang = 'CHO_GIAO_HANG'", nativeQuery = true)
    Integer getCountHoaDonCGH();

    @Query(value = "select count(id) from hoa_don where trang_thai_don_hang = 'DANG_GIAO'", nativeQuery = true)
    Integer getCountHoaDonDG();

    @Query(value = "select count(id) from hoa_don where trang_thai_don_hang = 'HOAN_THANH'", nativeQuery = true)
    Integer getCountHoaDonHT();

    @Query(value = "select count(id) from hoa_don where trang_thai_don_hang = 'HUY_DON'", nativeQuery = true)
    Integer getCountHoaDonHuy();

    @Query(value = """
            SELECT 
                hd.id AS idHoaDon,
                hd.ma AS maHoaDon,
                hd.create_at AS ngayDatHang,
                hd.dia_chi_giao_hang AS diaChiGiaoHang,
                hd.ngay_du_kien AS ngayGiaoHang,
                hd.phi_van_chuyen AS phiVanChuyen,
                hd.phuong_thuc_thanh_toan AS phuongThucThanhToan,
                pgg.ma AS maGiamGia,
                hd.tong_tien AS tongTienHang,
                hd.tien_duoc_giam AS tienDuocGiam,
                hd.tien_phai_thanh_toan AS tienPhaiThanhToan,
                hd.trang_thai_don_hang AS trangThaiDonHang,
                hd.trang_thai_thanh_toan AS trangThaiThanhToan,
                COUNT(hdct.id_spct) AS tongSoSanPham
            FROM 
                datn.hoa_don hd
            LEFT JOIN 
                phieu_giam_gia pgg ON pgg.id = hd.id_phieu_giam_gia
            LEFT JOIN 
                hoa_don_chi_tiet hdct ON hdct.id_hoa_don = hd.id
            WHERE 
                hd.id_khach_hang = :idKhachHang
                AND (:maHD IS NULL OR hd.ma LIKE CONCAT('%', :maHD, '%'))
                AND (:trangThaiDonHang IS NULL OR hd.trang_thai_don_hang = :trangThaiDonHang)
                AND hd.phuong_thuc_giao_hang = 'Giao Hàng'
                AND (:ngay IS NULL OR DATE(hd.create_at) = :ngay)
            GROUP BY 
                hd.id, 
                hd.ma, 
                hd.create_at,
                hd.dia_chi_giao_hang, 
                hd.ngay_du_kien, 
                hd.phi_van_chuyen, 
                hd.phuong_thuc_thanh_toan, 
                pgg.ma, 
                hd.tong_tien, 
                hd.tien_duoc_giam, 
                hd.tien_phai_thanh_toan, 
                hd.trang_thai_don_hang, 
                hd.trang_thai_thanh_toan
            ORDER BY 
                hd.create_at DESC
            """, nativeQuery = true)
    List<HoaDonTheoIDKH> getHoaDonTheoKH(
            @Param("idKhachHang") Integer idKhachHang,
            @Param("maHD") String maHD,
            @Param("trangThaiDonHang") String trangThaiDonHang,
            @Param("ngay") String ngay // Ngày lọc (YYYY-MM-DD)
    );

    @Transactional
    @Modifying
    @Query(value = "delete  from hoa_don where phuong_thuc_giao_hang = 'Tại quầy' and trang_thai_don_hang ='CHO_XAC_NHAN'", nativeQuery = true)
    void deleteByHoaDonTaiQuay();

    @Transactional
    @Modifying
    @Query(value = "delete  from lich_su_hoa_don where id_hoa_don in ( select id from hoa_don where phuong_thuc_giao_hang = 'Tại quầy' and trang_thai_don_hang = 'CHO_XAC_NHAN')  ",
            nativeQuery = true)
    void deleteByLishSuHoaDonTaiQuay();
}
