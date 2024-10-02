package com.example.shoes.service;

import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.entity.KhachHang;

import java.util.List;

public interface KhachHangService {
    List<KhachHangResponse> findAll();
    KhachHang add(KhachHangRequest request);
    KhachHang update(KhachHangRequest request);

}
