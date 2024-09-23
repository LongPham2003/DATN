package com.example.shoes.service;

import com.example.shoes.dto.khachhang.response.KhachHangResponse;

import java.util.List;

public interface KhachHangService {
    List<KhachHangResponse> findAll();
}
