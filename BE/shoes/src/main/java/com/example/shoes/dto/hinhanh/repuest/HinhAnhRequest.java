package com.example.shoes.dto.hinhanh.repuest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HinhAnhRequest {
    private String tenAnh;
    private String duLieuAnhBase64;
    private Integer idSanPhamChiTiet;
    private Boolean trangThai;

}
