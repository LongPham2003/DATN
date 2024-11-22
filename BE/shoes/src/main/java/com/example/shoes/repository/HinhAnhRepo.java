package com.example.shoes.repository;

import com.example.shoes.dto.hinhanh.response.HinhAnhResponse;
import com.example.shoes.entity.HinhAnh;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface HinhAnhRepo extends JpaRepository<HinhAnh, Integer> {
    // Truy vấn lấy ảnh đầu tiên theo idSanPhamChiTiet

    @Query("SELECT h FROM HinhAnh h WHERE h.idSanPhamChiTiet.id = :idSanPhamChiTiet ")
    List<HinhAnh> findTopByIdSanPhamChiTiet_IdOrderByIdAsc(@Param("idSanPhamChiTiet") Integer idSanPhamChiTiet, Pageable pageable);
    @Query("SELECT h FROM HinhAnh h WHERE h.idSanPhamChiTiet.id = :idSanPhamChiTiet ")
    Optional<List<HinhAnh>> findAllHinhAnhTheoIDSPCT(@Param("idSanPhamChiTiet") Integer idSanPhamChiTiet);
//   lay ra 5 hinh anh theo id san pham
        @Query(value = """
        SELECT ha.* 
        FROM hinh_anh ha
        JOIN san_pham_chi_tiet spct ON ha.id_san_pham_chi_tiet = spct.id
        JOIN san_pham sp ON spct.id_san_pham = sp.id
        WHERE sp.id = :idSanPham
        AND ha.trang_thai = true
        ORDER BY ha.id ASC
        LIMIT 5
    """, nativeQuery = true)
        List<HinhAnh> findTop5ImagesBySanPhamId(@Param("idSanPham") Integer idSanPham);


}
