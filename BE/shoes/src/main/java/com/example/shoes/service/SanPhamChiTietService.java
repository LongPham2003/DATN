package com.example.shoes.service;




import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;

import java.util.List;

public interface SanPhamChiTietService {
    PhanTrangResponse<SanPhamChiTietResponse> getSanPhamChiTiet(int pageNumber, int pageSize);
    SanPhamChiTietResponse getById(Integer id);
    SanPhamChiTietResponse create(SanPhamChiTietRequest request);
    SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request);
}
