package com.example.shoes.service;




import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;

import java.util.List;

public interface SanPhamChiTietService {
    List<SanPhamChiTietResponse> findAll();
    SanPhamChiTietResponse getById(Integer id);
    SanPhamChiTietResponse create(SanPhamChiTietRequest request);
    SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request);
}
