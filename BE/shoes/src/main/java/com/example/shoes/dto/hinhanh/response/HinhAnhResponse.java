package com.example.shoes.dto.hinhanh.response;

import com.example.shoes.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

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

}
