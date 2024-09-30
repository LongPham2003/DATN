package com.example.shoes.dto.hinhanh.response;

import com.example.shoes.entity.SanPhamChiTiet;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HinhAnhResponse {
    private Integer id;
    private String tenAnh;
    private byte[] duLieuAnh;
    private Integer idSanPhamChiTiet;
    private Boolean trangThai ;
}
