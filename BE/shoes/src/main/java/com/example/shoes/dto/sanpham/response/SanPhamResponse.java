package com.example.shoes.dto.sanpham.response;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SanPhamResponse {

    private Integer id;
    private String idLoai;
    private String tenSanPham;
    private LocalDate ngayTao;
    private String moTa;
    private Boolean trangThai;
}
