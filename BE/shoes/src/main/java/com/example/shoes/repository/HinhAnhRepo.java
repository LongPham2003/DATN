package com.example.shoes.repository;

import com.example.shoes.dto.hinhanh.response.HinhAnhResponse;
import com.example.shoes.entity.HinhAnh;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HinhAnhRepo extends JpaRepository<HinhAnh, Integer> {
    // Truy vấn lấy ảnh đầu tiên theo idSanPhamChiTiet

    @Query("SELECT h FROM HinhAnh h WHERE h.idSanPhamChiTiet.id = :idSanPhamChiTiet ")
    List<HinhAnh> findTopByIdSanPhamChiTiet_IdOrderByIdAsc(@Param("idSanPhamChiTiet") Integer idSanPhamChiTiet, Pageable pageable);
    @Query("SELECT h FROM HinhAnh h WHERE h.idSanPhamChiTiet.id = :idSanPhamChiTiet ")
    Optional<List<HinhAnh>> findAllHinhAnhTheoIDSPCT(@Param("idSanPhamChiTiet") Integer idSanPhamChiTiet);
}
