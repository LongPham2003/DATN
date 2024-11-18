package com.example.shoes.repository;
import com.example.shoes.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MauSacRepo extends JpaRepository<MauSac, Integer> {
    // Phương thức tìm kiếm  theo tên (không phân biệt chữ hoa thường)
    List<MauSac> findByTenContainingIgnoreCase(String ten);
    // Phương thức tìm kiếm  theo tên và trạng thái
    List<MauSac> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<MauSac> findByTrangThai(Boolean trangThai);


    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "select ms from MauSac ms where ms.ten like %:keyword% order by  ms.trangThai desc,ms.id desc")
    Page<MauSac> getMauSac(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo tên không
    boolean existsByTen(String ten);
    // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT ms FROM MauSac  ms WHERE ms.trangThai = true")
    List<MauSac> getAllTrangThaiTrue();
//   lay ra danh sach mau sac theo id san pham
    @Query("""
                SELECT ms 
                FROM MauSac ms
                JOIN SanPhamChiTiet spct ON spct.idMauSac.id = ms.id 
                WHERE spct.idSanPham.id = :idSanPham
            """)
    List<MauSac> getMauSacByIdSP(@Param("idSanPham") Integer idSanPham);
}
