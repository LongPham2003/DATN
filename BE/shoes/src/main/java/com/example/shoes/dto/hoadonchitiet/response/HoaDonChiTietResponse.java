package com.example.shoes.dto.hoadonchitiet.response;

import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.SanPhamChiTiet;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Setter
@Getter
public class HoaDonChiTietResponse {
    private Integer id;
    private Integer idHoaDon;
    private Integer idSpct;
    private String tenSanPham;
    private BigDecimal donGia;
    private BigDecimal soLuong;
    private BigDecimal tongTienChiTiet;  // Tổng tiền của chi tiết hóa đơn (số lượng * đơn giá)
}
