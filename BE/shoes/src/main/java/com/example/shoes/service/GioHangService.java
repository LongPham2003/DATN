package com.example.shoes.service;


import com.example.shoes.dto.giohang.request.GioHangRequest;
import com.example.shoes.dto.giohang.response.GioHangResponse;

public interface GioHangService {
    GioHangResponse create(GioHangRequest request);
}
