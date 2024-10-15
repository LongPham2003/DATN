package com.example.shoes.repository;


import com.example.shoes.entity.KichThuoc;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KichThuocRepo extends JpaRepository<KichThuoc, Integer> {
    // Phương thức tìm kiếm  theo kich thuoc (không phân biệt chữ hoa thường)
    List<KichThuoc> findByKichThuocContainingIgnoreCase(String kichThuoc);
    // Phương thức tìm kiếm  theo kich thuoc và trạng thái
    List<KichThuoc> findByKichThuocContainingIgnoreCaseAndTrangThai(String kichThuoc, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<KichThuoc> findByTrangThai(Boolean trangThai);

    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "select kt  from KichThuoc kt where  kt.kichThuoc like %:keyword% order by kt.trangThai desc ,kt.id desc")
    Page<KichThuoc> getKichThuoc(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo kich thuoc không
    boolean existsByKichThuoc(String kichThuoc);

}

