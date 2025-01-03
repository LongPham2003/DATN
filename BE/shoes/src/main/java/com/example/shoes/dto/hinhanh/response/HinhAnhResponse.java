package com.example.shoes.dto.hinhanh.response;

import com.example.shoes.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
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
