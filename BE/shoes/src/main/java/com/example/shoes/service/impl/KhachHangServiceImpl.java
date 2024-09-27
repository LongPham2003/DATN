package com.example.shoes.service.impl;

import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    private KhachHangRepo khachHangRepo;
    @Override
    public List<KhachHangResponse> findAll() {
      List<KhachHang> list = khachHangRepo.findAll();
      List<KhachHangResponse> khachHangResponses = new ArrayList<>();
      for (KhachHang khachHang : list) {
          KhachHangResponse khachHangResponse = new KhachHangResponse();
          khachHangResponse.setId(khachHang.getId());
          khachHangResponse.setHoTen(khachHang.getHoTen());
          khachHangResponse.setSdt(khachHang.getSdt());
          khachHangResponse.setEmail(khachHang.getEmail());
          khachHangResponse.setNgaySinh(khachHang.getNgaySinh());
          khachHangResponse.setDiaChiMacDinh(khachHang.getDiaChiMacDinh());
          khachHangResponse.setGioiTinh(khachHang.getGioiTinh());
          khachHangResponse.setTrangThai(khachHang.getTrangThai());
          khachHangResponses.add(khachHangResponse);
      }

      return    khachHangResponses;
    }
}
