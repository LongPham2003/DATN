package com.example.shoes.repository;


import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.KichThuoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
@Repository
public interface KichThuocRepo extends JpaRepository<KichThuoc, Integer> {
    // Phương thức tìm kiếm  theo kich thuoc (không phân biệt chữ hoa thường)
    List<KichThuoc> findByKichThuocContainingIgnoreCase(String kichThuoc);
    // Phương thức tìm kiếm  theo kich thuoc và trạng thái
    List<KichThuoc> findByKichThuocContainingIgnoreCaseAndTrangThai(String kichThuoc, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<KichThuoc> findByTrangThai(Boolean trangThai);

    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm

    @Query(value = "select kt  from KichThuoc kt where  kt.kichThuoc like %:keyword% order by kt.trangThai desc , kt.id desc")

    Page<KichThuoc> getKichThuoc(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo kich thuoc không
    boolean existsByKichThuoc(String kichThuoc);
    // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT kt FROM KichThuoc  kt WHERE kt.trangThai = true")
    List<KichThuoc> getAllTrangThaiTrue();
//    lay ra danh sach kich thuoc theo id san pham
    @Query("""
                SELECT kt 
                FROM KichThuoc kt 
                JOIN SanPhamChiTiet spct ON spct.idKichThuoc.id = kt.id 
                WHERE spct.idSanPham.id = :idSanPham
            """)
    List<KichThuoc> getKichThuocByIdSP(@Param("idSanPham") Integer idSanPham);

}

