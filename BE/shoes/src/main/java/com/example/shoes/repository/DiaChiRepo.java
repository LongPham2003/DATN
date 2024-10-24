package com.example.shoes.repository;

import com.example.shoes.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DiaChiRepo  extends JpaRepository<DiaChi, Integer> {
    DiaChi getDiaChiByKhachHangIdAndDiaChiMacDinh(Integer id,Boolean diaChiMacDinh);
    @Query("SELECT dc FROM DiaChi dc JOIN dc.khachHang kh WHERE kh.id = :idKhachHang   ")
    List<DiaChi> findDiaChiByKhachHangId(Integer idKhachHang);

    // Cập nhật tất cả các địa chỉ của khách hàng thành false trừ địa chỉ có id là idDiaChi
    @Modifying
    @Query("UPDATE DiaChi dc SET dc.diaChiMacDinh = false WHERE dc.khachHang.id = :idKhachHang AND dc.id != :idDiaChi")
    void unsetAllOtherDefaultAddresses(@Param("idKhachHang") Integer idKhachHang, @Param("idDiaChi") Integer idDiaChi);

}
