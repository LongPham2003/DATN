package com.example.shoes.repository;

import com.example.shoes.dto.lichsuhoadon.response.LSHD;
import com.example.shoes.dto.lichsuhoadon.response.LichSuHoaDonResponse;
import com.example.shoes.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuHoaDonRepo extends JpaRepository<LichSuHoaDon,Integer> {
    @Query(value ="""
            SELECT lshd.id as id ,lshd.id_hoa_don as idHoaDon,
                   lshd.mo_ta as moTa,
                    lshd.trang_thai as trangThai,
                    lshd.nguoi_thuc_hien as nguoiThucHien, 
                    lshd.thoi_gian as thoiGian,
                    lshd.create_at as createAt,
                    lshd.create_by as createBy
                    FROM lich_su_hoa_don lshd WHERE lshd.id_hoa_don =:id_hoa_don 
                        """
            , nativeQuery = true)
    List<LSHD> getByIdHoaDon(@Param("id_hoa_don") Integer id);
}
