package com.example.shoes.service.impl;

import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.email.EmailService;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {

    private final KhachHangRepo khachHangRepo;
    private  final PasswordEncoder passwordEncoder;
    private final EmailService emailService;


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

//    @Override
//    @Transactional
//    public KhachHang add(KhachHangRequest request) {
//        if(khachHangRepo.existsByEmail(request.getEmail().trim().toLowerCase())){
//            throw new AppException(ErrorCode.USER_EXISTED);
//        }
//        TaiKhoan taiKhoan = new TaiKhoan();
//        taiKhoan.setEmail(request.getEmail());
//        taiKhoan.setTrangThai(true);
//        taiKhoan.setPassword(passwordEncoder.encode(request.getMatKhau()));
//
//        KhachHang khachHang = new KhachHang();
//        khachHang.setHoTen(request.getHoTen());
//        khachHang.setSdt(request.getSdt());
//        khachHang.setEmail(request.getEmail());
//        khachHang.setTrangThai(true);
//        khachHang.setGioiTinh(request.getGioiTinh());
//        khachHang.set
//    }
}
