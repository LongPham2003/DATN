package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;

import java.util.List;

public interface SanPhamChiTietService {
    PhanTrangResponse<SanPhamChiTietResponse> getSanPhamChiTiet(int pageNumber, int pageSize);
    SanPhamChiTietResponse getById(Integer id);
    SanPhamChiTietResponse create(SanPhamChiTietRequest request);
    SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request);
    List<SanPhamChiTietResponse> locSanPhamChiTiet(String sanPham, String mauSac, String kichThuoc, String chatLieu, String thuongHieu, String deGiay, boolean trangThai);
}
