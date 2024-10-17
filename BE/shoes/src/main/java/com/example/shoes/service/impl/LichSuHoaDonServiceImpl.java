package com.example.shoes.service.impl;

import com.example.shoes.dto.lichsuhoadon.request.LichSuHoaDonRequest;
import com.example.shoes.dto.lichsuhoadon.response.LichSuHoaDonResponse;
import com.example.shoes.repository.LichSuHoaDonRepo;
import com.example.shoes.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {
    @Autowired
    private LichSuHoaDonRepo lichSuHoaDonRepo;
    @Override
    public LichSuHoaDonResponse create(LichSuHoaDonRequest lichSuHoaDonRequest) {
        return null;
    }

    @Override
    public LichSuHoaDonResponse findByid(Integer id) {
        return null;
    }

    @Override
    public List<LichSuHoaDonResponse> getAllHoaDon() {
        return List.of();
    }
}
