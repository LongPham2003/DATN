package com.example.shoes.repository;
import com.example.shoes.entity.DeGiay;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeGiayRepo extends JpaRepository<DeGiay, Integer> {
    // Phương thức tìm kiếm  theo tên (không phân biệt chữ hoa thường)
    List<DeGiay>findByTenContainingIgnoreCase(String ten);
    // Phương thức tìm kiếm  theo tên và trạng thái
    List<DeGiay> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<DeGiay> findByTrangThai(Boolean trangThai);


    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "select dg  from DeGiay dg where   dg.ten like %:keyword% order by dg.trangThai desc ,dg.id desc")
    Page<DeGiay> getDeGiay(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo tên không
    boolean existsByTen(String ten);
}
