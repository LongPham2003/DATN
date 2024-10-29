package com.example.shoes.service;


import com.example.shoes.dto.giohang.request.GioHangRequest;
import com.example.shoes.dto.giohang.response.GioHangResponse;

public interface GioHangService {
    void addSanPhamToGioHang(Integer khachHangId, Integer sanPhamChiTietId, Integer soLuong);
    GioHangResponse create(GioHangRequest request);
}
