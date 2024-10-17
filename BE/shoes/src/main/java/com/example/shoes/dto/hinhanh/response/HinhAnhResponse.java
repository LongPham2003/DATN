package com.example.shoes.dto.hinhanh.response;

import com.example.shoes.entity.SanPhamChiTiet;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Setter
@Getter
public class HinhAnhResponse {
    private Integer id;
    private String tenAnh;
    private String duLieuAnhBase64;
    private Integer idSanPhamChiTiet;
    private Boolean trangThai;

    public void setDuLieuAnh(byte[] duLieuAnh) {
        if (duLieuAnh != null) {
            this.duLieuAnhBase64 = Base64.getEncoder().encodeToString(duLieuAnh);
        }
    }
}
