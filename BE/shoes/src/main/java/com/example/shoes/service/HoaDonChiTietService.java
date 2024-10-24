package com.example.shoes.service;

import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose;
import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietResponse;

import java.util.List;

public interface HoaDonChiTietService {
    List<HoaDonChiTietResponse> getAllHoaDonCT();
    List<HoaDonChiTietBHRespose> getSPCTByIdHoaDon(Integer IdhoaDon);
}
