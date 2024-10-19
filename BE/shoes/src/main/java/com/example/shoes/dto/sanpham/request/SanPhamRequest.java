package com.example.shoes.dto.sanpham.request;

import com.example.shoes.entity.Loai;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SanPhamRequest {
    private Integer idLoai;
    private String tenSanPham;
    private LocalDate ngayTao;
    private String moTa;
    private Boolean trangThai;
}
