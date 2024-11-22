package com.example.shoes.service;

import com.example.shoes.dto.lichsuhoadon.response.LSHD;
import com.example.shoes.dto.lichsuhoadon.response.LichSuHoaDonResponse;
import com.example.shoes.entity.LichSuHoaDon;

import java.util.List;

public interface LichSuHoaDonService {

    List<LichSuHoaDonResponse> getAll();

    List<LSHD> getByBill(Integer billId);
}
