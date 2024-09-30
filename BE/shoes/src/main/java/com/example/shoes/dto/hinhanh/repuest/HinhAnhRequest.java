package com.example.shoes.dto.hinhanh.repuest;

import com.example.shoes.entity.SanPhamChiTiet;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HinhAnhRequest {
    private String tenAnh;
    private byte[] duLieuAnh;
    private Integer idSanPhamChiTiet;
    private Boolean trangThai ;
}
