package com.example.shoes.repository;


import com.example.shoes.entity.KichThuoc;
import com.example.shoes.entity.ThuongHieu;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThuongHieuRepo extends JpaRepository<ThuongHieu, Integer> {
    // Phương thức tìm kiếm  theo tên (không phân biệt chữ hoa thường)
    List<ThuongHieu> findByTenContainingIgnoreCase(String ten);
    // Phương thức tìm kiếm  theo tên và trạng thái
    List<ThuongHieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<ThuongHieu> findByTrangThai(Boolean trangThai);

    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "select th from ThuongHieu th where   th.ten like %:keyword% order by  th.trangThai desc, th.id desc ")
    Page<ThuongHieu> getThuongHieu(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo tên không
    boolean existsByTen(String ten);
    // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT th FROM ThuongHieu  th WHERE th.trangThai = true")
    List<ThuongHieu> getAllTrangThaiTrue();
}
