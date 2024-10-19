package com.example.shoes.repository;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.SanPham;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.List;
@Repository
public interface ChatLieuRepo extends JpaRepository<ChatLieu, Integer> {
    // Phương thức tìm kiếm  theo tên (không phân biệt chữ hoa thường)
    List<ChatLieu>findByTenContainingIgnoreCase(String ten);
    // Phương thức tìm kiếm  theo tên và trạng thái
    List<ChatLieu> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<ChatLieu> findByTrangThai(Boolean trangThai);

    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "SELECT cl FROM ChatLieu cl WHERE   cl.ten LIKE %:keyword% order by cl.trangThai desc , cl.id desc")
    Page<ChatLieu> getChatLieu(Pageable pageable,  String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo tên không
    boolean existsByTen(String ten);
    // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT cl FROM ChatLieu  cl WHERE cl.trangThai = true")
    List<ChatLieu> getAllTrangThaiTrue();

}
