package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;

import com.example.shoes.entity.SanPham;



public interface SanPhamService {
    PhanTrangResponse<SanPhamResponse> getSanPham(int pageNumber, int pageSize, String keyword);
    SanPhamResponse getById(Integer id);
    SanPhamResponse create(SanPhamRequest request);
    SanPhamResponse update(Integer id, SanPhamRequest request);

}
