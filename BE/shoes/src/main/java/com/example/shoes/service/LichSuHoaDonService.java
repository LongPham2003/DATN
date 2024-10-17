package com.example.shoes.service;



import com.example.shoes.dto.lichsuhoadon.request.LichSuHoaDonRequest;
import com.example.shoes.dto.lichsuhoadon.response.LichSuHoaDonResponse;

import java.util.List;

public interface LichSuHoaDonService {
    LichSuHoaDonResponse create(LichSuHoaDonRequest lichSuHoaDonRequest);
    LichSuHoaDonResponse findByid(Integer id);
    List<LichSuHoaDonResponse> getAllHoaDon();
}
