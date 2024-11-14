package com.example.shoes.repository;

import com.example.shoes.dto.thongke.response.DoanhThu;
import com.example.shoes.dto.thongke.response.SanPhamBanChay;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeRepo extends HoaDonRepo{

    //Ngay hom nay
    @Query(value = """
        SELECT COALESCE((SELECT SUM(hd.tong_tien)
          FROM hoa_don hd
          WHERE hd.trang_thai = 'DA_THANH_TOAN'
            AND DATE(hd.update_at) = CURDATE()), 0) AS tongTien,
        COALESCE(COUNT(DISTINCT hd.id_khach_hang), 0) AS tongKhachHang,
        COALESCE(SUM(hdct.so_luong), 0) AS sanPhamBanDuoc,
        COALESCE(COUNT(DISTINCT CASE WHEN hd.id_khach_hang IS NULL THEN hd.id END), 0) AS khachLe,
        COALESCE(COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' THEN hd.id END), 0) AS donThanhCong,
        COALESCE(COUNT(CASE WHEN hd.trang_thai = 'HUY_DON' THEN hd.id END), 0) AS donHuy,
        COALESCE(SUM(hd.tien_duoc_giam), 0) AS tongTienGiam,
        COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' AND hd.id_phieu_giam_gia IS NOT NULL THEN hd.id END) AS tongDonApDungPhieuGiamGia
    FROM
        hoa_don hd
    LEFT JOIN
        hoa_don_chi_tiet hdct ON hd.id = hdct.id_hoa_don
    WHERE
        DATE(hd.update_at) = CURDATE();
""", nativeQuery = true)
    DoanhThu doanhThuHomNay();


    // Tuần này
    @Query(value = """
                SELECT
                    (SELECT SUM(hd.tong_tien)
                     FROM hoa_don hd
                     WHERE hd.trang_thai = 'DA_THANH_TOAN'
                     AND WEEK(hd.update_at) = WEEK(CURDATE())
                     AND YEAR(hd.update_at) = YEAR(CURDATE())) AS tongTien,
                  COUNT(DISTINCT hd.id_khach_hang) AS tongKhachHang,
                  SUM(COALESCE(hdct.so_luong, 0)) AS sanPhamBanDuoc,
                  COUNT(DISTINCT CASE WHEN hd.id_khach_hang IS NULL THEN hd.id END) AS khachLe,
                  COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' THEN hd.id END) AS donThanhCong,
                  COUNT(CASE WHEN hd.trang_thai = 'HUY_DON' THEN hd.id END) AS donHuy,
                  COALESCE(SUM(hd.tien_duoc_giam), 0) AS tongTienGiam,
                  COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' AND hd.id_phieu_giam_gia IS NOT NULL THEN hd.id END) AS tongDonApDungPhieuGiamGia
                FROM
                    hoa_don hd
                LEFT JOIN
                    hoa_don_chi_tiet hdct ON hd.id = hdct.id_hoa_don
                WHERE
                    WEEK(hd.update_at) = WEEK(CURDATE())
                    AND YEAR(hd.update_at) = YEAR(CURDATE());
            """, nativeQuery = true)
    DoanhThu doanhThuTuan();

//Tháng này
@Query(value = """
               SELECT
                     (SELECT SUM(hd.tong_tien)
                     FROM hoa_don hd
                     WHERE hd.trang_thai = 'DA_THANH_TOAN'
                     AND MONTH(hd.update_at) = MONTH(CURDATE())
                     AND YEAR(hd.update_at) = YEAR(CURDATE())) AS tongTien,
               COUNT(DISTINCT hd.id_khach_hang) AS tongKhachHang,
               SUM(COALESCE(hdct.so_luong, 0)) AS sanPhamBanDuoc,
               COUNT(DISTINCT CASE WHEN hd.id_khach_hang IS NULL THEN hd.id END) AS khachLe,
               COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' THEN hd.id END) AS donThanhCong,
               COUNT(CASE WHEN hd.trang_thai = 'HUY_DON' THEN hd.id END) AS donHuy,
               COALESCE(SUM(hd.tien_duoc_giam), 0) AS tongTienGiam,
               COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' AND hd.id_phieu_giam_gia IS NOT NULL THEN hd.id END) AS tongDonApDungPhieuGiamGia
               FROM
               hoa_don hd
               LEFT JOIN
               hoa_don_chi_tiet hdct ON hd.id = hdct.id_hoa_don
               WHERE
               MONTH(hd.update_at) = MONTH(CURDATE())
               AND YEAR(hd.update_at) = YEAR(CURDATE());
                                                            
            """, nativeQuery = true)
DoanhThu doanhThuThang();

// Năm nay
@Query(value = """
                SELECT
                    (SELECT SUM(hd.tong_tien)
                     FROM hoa_don hd
                     WHERE hd.trang_thai = 'DA_THANH_TOAN'
                       AND YEAR(hd.update_at) = YEAR(CURDATE())) AS tongTien,
                    COUNT(DISTINCT hd.id_khach_hang) AS tongKhachHang,
                    SUM(COALESCE(hdct.so_luong, 0)) AS sanPhamBanDuoc,
                    COUNT(DISTINCT CASE WHEN hd.id_khach_hang IS NULL THEN hd.id END) AS khachLe,
                    COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' THEN hd.id END) AS donThanhCong,
                    COUNT(CASE WHEN hd.trang_thai = 'HUY_DON' THEN hd.id END) AS donHuy,
                    COALESCE(SUM(hd.tien_duoc_giam), 0) AS tongTienGiam,
                    COUNT(CASE WHEN hd.trang_thai = 'DA_THANH_TOAN' AND hd.id_phieu_giam_gia IS NOT NULL THEN hd.id END) AS tongDonApDungPhieuGiamGia
                FROM
                    hoa_don hd
                LEFT JOIN
                    hoa_don_chi_tiet hdct ON hd.id = hdct.id_hoa_don
                WHERE
                    YEAR(hd.update_at) = YEAR(CURDATE());
                
            """, nativeQuery = true)
DoanhThu doanhThuNam();

//Top 3 San Pham ban chay
    // Hom nay
    @Query(value = """
            SELECT
    sp.id AS idSP,
    sp.ten_san_pham AS tenSanPham,
    l.ten AS tenLoai,
    (SELECT spct_inner.id
     FROM san_pham_chi_tiet spct_inner 
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY spct_inner.id
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS idSPCTBanChayNhat
    ,
    (SELECT th.ten
     FROM san_pham_chi_tiet spct_inner
     JOIN thuong_hieu th ON th.id = spct_inner.id_thuong_hieu
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY th.ten
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS tenThuongHieuBanChay,
    MAX(spct.don_gia) AS giaCaoNhat,
    MIN(spct.don_gia) AS giaThapNhat,
    SUM(hdct.so_luong) AS tongSoLuongBanDuoc
FROM
    san_pham sp
JOIN
    san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
JOIN
    loai l ON sp.id_loai = l.id
JOIN
    hoa_don_chi_tiet hdct ON spct.id = hdct.id_spct
JOIN
    hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE
    hd.trang_thai = 'DA_THANH_TOAN'
    AND DATE(hd.update_at) = CURDATE() -- Lọc theo ngày hôm nay
GROUP BY
    sp.id, sp.ten_san_pham, l.ten
ORDER BY
    tongSoLuongBanDuoc DESC
LIMIT 3;

""",nativeQuery = true)
    List<SanPhamBanChay> SPBanChayHomNay();

    // Tuan nay

    @Query(value = """

            SELECT
    sp.id AS idSP,
    sp.ten_san_pham AS tenSanPham,
    l.ten AS tenLoai,
    (SELECT spct_inner.id
     FROM san_pham_chi_tiet spct_inner  
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY spct_inner.id
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS idSPCTBanChayNhat
    ,
    (SELECT th.ten
     FROM san_pham_chi_tiet spct_inner
     JOIN thuong_hieu th ON th.id = spct_inner.id_thuong_hieu
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY th.ten
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS tenThuongHieuBanChay,
    MAX(spct.don_gia) AS giaCaoNhat,
    MIN(spct.don_gia) AS giaThapNhat,
    SUM(hdct.so_luong) AS tongSoLuongBanDuoc
FROM
    san_pham sp
JOIN
    san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
JOIN
    loai l ON sp.id_loai = l.id
JOIN
    hoa_don_chi_tiet hdct ON spct.id = hdct.id_spct
JOIN
    hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE
    hd.trang_thai = 'DA_THANH_TOAN'
    AND WEEK(hd.update_at, 1) = WEEK(CURDATE(), 1) -- Lọc theo tuần hiện tại
    AND YEAR(hd.update_at) = YEAR(CURDATE())       -- Lọc theo năm hiện tại
GROUP BY
    sp.id, sp.ten_san_pham, l.ten
ORDER BY
    tongSoLuongBanDuoc DESC
LIMIT 3;


""", nativeQuery = true)
    List<SanPhamBanChay> SPBanChayTuanNay();


    // Thang nay
    @Query(value = """

            SELECT\s
    sp.id AS idSP,
    sp.ten_san_pham AS tenSanPham,
    l.ten AS tenLoai,
    (SELECT spct_inner.id\s
     FROM san_pham_chi_tiet spct_inner   \s
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY spct_inner.id
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS idSPCTBanChayNhat
    ,
    (SELECT th.ten\s
     FROM san_pham_chi_tiet spct_inner
     JOIN thuong_hieu th ON th.id = spct_inner.id_thuong_hieu
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY th.ten
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS tenThuongHieuBanChay,
    MAX(spct.don_gia) AS giaCaoNhat,
    MIN(spct.don_gia) AS giaThapNhat,
    SUM(hdct.so_luong) AS tongSoLuongBanDuoc
FROM\s
    san_pham sp
JOIN\s
    san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
JOIN\s
    loai l ON sp.id_loai = l.id
JOIN\s
    hoa_don_chi_tiet hdct ON spct.id = hdct.id_spct
JOIN\s
    hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE\s
    hd.trang_thai = 'DA_THANH_TOAN'
    AND MONTH(hd.update_at) = MONTH(CURDATE()) -- Lọc theo tháng hiện tại
    AND YEAR(hd.update_at) = YEAR(CURDATE())   -- Lọc theo năm hiện tại
GROUP BY\s
    sp.id, sp.ten_san_pham, l.ten
ORDER BY\s
    tongSoLuongBanDuoc DESC
LIMIT 3;

""", nativeQuery = true)
    List<SanPhamBanChay> SPBanChayThang();
    // Nam nay
    @Query(value = """

            SELECT\s
    sp.id AS idSP,
    sp.ten_san_pham AS tenSanPham,
    l.ten AS tenLoai,
    (SELECT spct_inner.id\s
     FROM san_pham_chi_tiet spct_inner   \s
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY spct_inner.id
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS idSPCTBanChayNhat
    ,
    (SELECT th.ten\s
     FROM san_pham_chi_tiet spct_inner
     JOIN thuong_hieu th ON th.id = spct_inner.id_thuong_hieu
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
     GROUP BY th.ten
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS tenThuongHieuBanChay,
    MAX(spct.don_gia) AS giaCaoNhat,
    MIN(spct.don_gia) AS giaThapNhat,
    SUM(hdct.so_luong) AS tongSoLuongBanDuoc
FROM\s
    san_pham sp
JOIN\s
    san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
JOIN\s
    loai l ON sp.id_loai = l.id
JOIN\s
    hoa_don_chi_tiet hdct ON spct.id = hdct.id_spct
JOIN\s
    hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE\s
    hd.trang_thai = 'DA_THANH_TOAN'
    AND YEAR(hd.update_at) = YEAR(CURDATE()) -- Lọc theo năm hiện tại
GROUP BY\s
    sp.id, sp.ten_san_pham, l.ten
ORDER BY\s
    tongSoLuongBanDuoc DESC
LIMIT 3;

""", nativeQuery = true)
    List<SanPhamBanChay> SPBanChayNamNay();

    @Query(value = """
SELECT \s
    sp.id AS idSP,
    sp.ten_san_pham AS tenSanPham,
    l.ten AS tenLoai,
    (SELECT spct_inner.id 
     FROM san_pham_chi_tiet spct_inner    
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
       AND hd_inner.update_at BETWEEN :startdate AND :enddate -- Thêm điều kiện lọc theo khoảng ngày
     GROUP BY spct_inner.id
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS idSPCTBanChayNhat,
    (SELECT th.ten 
     FROM san_pham_chi_tiet spct_inner
     JOIN thuong_hieu th ON th.id = spct_inner.id_thuong_hieu
     JOIN hoa_don_chi_tiet hdct_inner ON spct_inner.id = hdct_inner.id_spct
     JOIN hoa_don hd_inner ON hd_inner.id = hdct_inner.id_hoa_don
     WHERE spct_inner.id_san_pham = sp.id
       AND hd_inner.trang_thai = 'DA_THANH_TOAN'
       AND hd_inner.update_at BETWEEN :startdate AND :enddate -- Thêm điều kiện lọc theo khoảng ngày
     GROUP BY th.ten
     ORDER BY SUM(hdct_inner.so_luong) DESC
     LIMIT 1) AS tenThuongHieuBanChay,
    MAX(spct.don_gia) AS giaCaoNhat,
    MIN(spct.don_gia) AS giaThapNhat,
    SUM(hdct.so_luong) AS tongSoLuongBanDuoc
FROM 
    san_pham sp
JOIN 
    san_pham_chi_tiet spct ON spct.id_san_pham = sp.id
JOIN 
    loai l ON sp.id_loai = l.id
JOIN 
    hoa_don_chi_tiet hdct ON spct.id = hdct.id_spct
JOIN 
    hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE 
    hd.trang_thai = 'DA_THANH_TOAN'
    AND hd.update_at BETWEEN :startdate AND :enddate -- Lọc theo khoảng ngày
GROUP BY 
    sp.id, sp.ten_san_pham, l.ten
ORDER BY 
    tongSoLuongBanDuoc DESC
LIMIT 3;
""", nativeQuery = true)
    List<SanPhamBanChay> khoangNgay(@Param("startdate") String startdate, @Param("enddate") String enddate);

}
