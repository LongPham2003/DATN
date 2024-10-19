package com.example.shoes.dto.sanpham.response;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SanPhamResponse {
    private Integer id;
    private Integer idLoai; // ID của Loại sản phẩm khi trả về dữ liệu cho client
    private String tenLoai; // lay ra ten cua loai cho de hieu
    private String tenSanPham;
    private LocalDate ngayTao;
    private String moTa;
    private Boolean trangThai;
}
