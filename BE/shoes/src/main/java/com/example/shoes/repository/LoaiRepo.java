package com.example.shoes.repository;


import com.example.shoes.entity.KichThuoc;
import com.example.shoes.entity.Loai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LoaiRepo extends JpaRepository<Loai, Integer> {
    // Phương thức tìm kiếm  theo tên (không phân biệt chữ hoa thường)
    List<Loai> findByTenContainingIgnoreCase(String ten);
    // Phương thức tìm kiếm  theo tên và trạng thái
    List<Loai> findByTenContainingIgnoreCaseAndTrangThai(String ten, Boolean trangThai);
    // Phương thức tìm kiếm  theo trạng thái
    List<Loai> findByTrangThai(Boolean trangThai);

    // Phương thức lấy danh sach với phân trang và từ khóa tìm kiếm
    @Query(value = "select l  from Loai l where   l.ten like %:keyword% order by l.trangThai desc ,l.id desc")
    Page<Loai> getLoai(Pageable pageable, String keyword);
    // Phương thức kiểm tra xem  có tồn tại theo tên không
    boolean existsByTen(String ten);
    // lấy tat ca danh sach sp co trang thai true
    @Query("SELECT l FROM Loai  l WHERE l.trangThai = true")
    List<Loai> getAllTrangThaiTrue();

    @Query(value = "select id from  loai",nativeQuery = true)
    List<Integer> getIds();

    @Query(value = "select id from  loai",nativeQuery = true)
    List<Integer> findAllById();

    @Query(value = "select id from  thuong_hieu",nativeQuery = true)
    List<Integer> findAllByIdThuongHieu();

    @Query(value = "select id from  de_giay",nativeQuery = true)
    List<Integer> findAllByIdDeGiay();

    @Query(value = "select id from  chat_lieu",nativeQuery = true)
    List<Integer> findAllByIdChatLieu();

    @Query(value = "select id from  mau_sac",nativeQuery = true)
    List<Integer> findAllByIdMauSac();

    @Query(value = "select id from  kich_thuoc",nativeQuery = true)
    List<Integer> findAllByIdKichThuoc();
}
