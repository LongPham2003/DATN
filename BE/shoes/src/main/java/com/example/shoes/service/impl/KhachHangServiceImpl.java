package com.example.shoes.service.impl;

import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.email.EmailService;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.DiaChiRepo;
import com.example.shoes.repository.GioHangRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.TaiKhoanRepo;
import com.example.shoes.service.GioHangService;
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
    private final PasswordEncoder passwordEncoder;
    private final TaiKhoanRepo taiKhoanRepo;
    private final EmailService emailService;
    private final DiaChiRepo diaChiRepo;
    private final GioHangRepo gioHangRepo;

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
            khachHangResponse.setGioiTinh(khachHang.getGioiTinh());
            khachHangResponse.setTrangThai(khachHang.getTrangThai());
            khachHangResponse.setDiaChi(khachHang.getDiaChis());
            khachHangResponses.add(khachHangResponse);
        }

        return khachHangResponses;
    }

    @Override
    @Transactional
    public KhachHang add(KhachHangRequest request) {
        if (khachHangRepo.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setTrangThai(true);
        taiKhoan.setPassword(passwordEncoder.encode(request.getMatKhau()));

        taiKhoanRepo.save(taiKhoan);

        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(request.getHoTen());
        khachHang.setSdt(request.getSdt());
        khachHang.setEmail(request.getEmail());
        khachHang.setNgaySinh(request.getNgaySinh());
        khachHang.setTrangThai(true);
        khachHang.setGioiTinh(request.getGioiTinh());
        khachHang.setTaiKhoan(taiKhoan);

        var newKhachHang = khachHangRepo.save(khachHang);

        DiaChi diaChi = new DiaChi();
        diaChi.setKhachHang(newKhachHang);
        diaChi.setDiaChiMacDinh(true);
        diaChi.setTinhThanhPho(request.getTinhThanhPho());
        diaChi.setXaPhuong(request.getXaPhuong());
        diaChi.setHuyenQuan(request.getHuyenQuan());
        diaChiRepo.save(diaChi);

        GioHang gioHang = new GioHang();
        gioHang.setTongSoLuong(0);
        gioHang.setIdKhachHang(newKhachHang);
        gioHangRepo.save(gioHang);

        return newKhachHang;
    }

    @Override
    public KhachHang update(KhachHangRequest request) {
        return null;
    }
}
