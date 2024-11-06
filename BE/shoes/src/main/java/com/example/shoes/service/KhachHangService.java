package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.entity.KhachHang;

import java.util.List;

public interface KhachHangService {
    PhanTrangResponse<KhachHang> getKhachHang(int pageNumber, int pageSize, String keyword,Boolean trangThai);
    List<KhachHangResponse> findAll();
    KhachHang add(KhachHangRequest request);
    KhachHang update(Integer id,KhachHangRequest request);
    KhachHang getById(Integer id);

}
