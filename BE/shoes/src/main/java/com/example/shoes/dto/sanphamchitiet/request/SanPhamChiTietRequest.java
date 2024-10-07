package com.example.shoes.dto.sanphamchitiet.request;


import com.example.shoes.entity.SanPhamChiTiet;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Builder
public class SanPhamChiTietRequest {
    private Integer idSanPham;
    private Integer idChatLieu;
    private Integer idMauSac;
    private Integer idKichThuoc;
    private Integer idThuongHieu;
    private Integer idDeGiay;
    private BigDecimal donGia;
    private Integer soLuong;
    private Boolean trangThai;


}
