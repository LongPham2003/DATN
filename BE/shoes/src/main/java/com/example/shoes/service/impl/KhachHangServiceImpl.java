package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.email.EmailService;
import com.example.shoes.entity.*;
import com.example.shoes.enums.Roles;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public PhanTrangResponse<KhachHang> getKhachHang(int pageNumber, int pageSize, String keyword) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        Page<KhachHang> page = khachHangRepo.getKhachHang(pageable, keyword);

        PhanTrangResponse<KhachHang> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());

        return phanTrangResponse;
    }

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
        taiKhoan.setRoles(Roles.ROLE_KHACHHANG.name());

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
        Optional<KhachHang> khachHangOptional = khachHangRepo.findById(request.getId());

        if (!khachHangOptional.isPresent()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if (khachHangRepo.existsByEmail(request.getEmail()) && !khachHangOptional.get().getEmail().equals(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (khachHangRepo.existsBySdt(request.getSdt()) && !khachHangOptional.get().getSdt().equals(request.getSdt())) {
            throw new AppException(ErrorCode.SDT_EXISTED);
        }

        KhachHang khachHang = khachHangOptional.get();

        TaiKhoan taiKhoan = khachHang.getTaiKhoan();
        taiKhoan.setEmail(request.getEmail());
        taiKhoan.setPassword(request.getMatKhau());
        taiKhoan.setTrangThai(request.getTrangThai());

        taiKhoanRepo.save(taiKhoan);

        khachHang.setHoTen(request.getHoTen());
        khachHang.setSdt(request.getSdt());
        khachHang.setEmail(request.getEmail());
        khachHang.setNgaySinh(request.getNgaySinh());
        khachHang.setTrangThai(request.getTrangThai());
        khachHang.setGioiTinh(request.getGioiTinh());
        khachHang.setTaiKhoan(taiKhoan);
        return khachHangRepo.save(khachHang);

    }
}
