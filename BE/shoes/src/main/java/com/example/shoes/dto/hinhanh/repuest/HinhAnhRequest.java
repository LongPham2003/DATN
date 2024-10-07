package com.example.shoes.dto.hinhanh.repuest;

import com.example.shoes.entity.SanPhamChiTiet;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HinhAnhRequest {
    @NotNull
    private String tenAnh;
    private byte[] duLieuAnhBase64;
    @NotNull
    private Boolean trangThai;
    private Integer idSanPhamChiTiet;
}
