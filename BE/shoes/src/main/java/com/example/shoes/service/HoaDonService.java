package com.example.shoes.service;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;

import java.util.List;

public interface HoaDonService {
 HoaDonResponse createHoaDon(HoaDonRequest hoaDonRequest);
 HoaDonResponse updateHoaDon( Integer id,HoaDonRequest hoaDonRequest);
 HoaDonResponse findByid(Integer id);
 HoaDonResponse deleteHoaDon(Integer id);
 List<HoaDonResponse> getAllHoaDon();
}
