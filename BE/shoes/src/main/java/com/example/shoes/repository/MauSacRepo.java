package com.example.shoes.repository;


import com.example.shoes.entity.MauSac;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    // Phương thức xóa  bằng cách cập nhật trạng thái thành false(xóa mem)
    @Modifying
    @Transactional
    @Query("UPDATE MauSac ms SET ms.trangThai = false WHERE ms.id = :id")
    void DeleteMauSac(@Param("id") Integer id);
    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "select ms from MauSac ms where ms.trangThai=true and ms.ten like %:keyword% order by ms.id desc")
    Page<MauSac> getMauSac(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo tên không
    boolean existsByTen(String ten);

}
