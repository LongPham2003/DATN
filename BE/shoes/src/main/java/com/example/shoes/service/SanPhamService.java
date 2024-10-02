package com.example.shoes.service;

import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;
import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;

import java.util.List;

public interface SanPhamService {
    List<SanPhamResponse> findAll();
    SanPhamResponse getById(Integer id);
    SanPhamResponse create(SanPhamRequest request);
    SanPhamResponse update(Integer id, SanPhamRequest request);
}
