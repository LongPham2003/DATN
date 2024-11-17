package com.example.shoes.service.impl;

import com.example.shoes.dto.giohang.request.GioHangRequest;
import com.example.shoes.dto.giohang.response.GioHangResponse;
import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.GioHangChiTiet;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.GioHangChiTietRepo;
import com.example.shoes.repository.GioHangRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.GioHangService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class GioHangServiceImpl implements GioHangService {
    @Autowired
    private GioHangRepo gioHangRepo;
    @Autowired
    private KhachHangRepo khachHangRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;
    @Autowired
    private GioHangChiTietRepo gioHangChiTietRepo;

    private KhachHang getCurrentKhachHang() {
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Tên đăng nhập

        // Tìm nhân viên từ tên đăng nhập
        return khachHangRepo.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF)); // Xử lý nếu không tìm thấy nhân viên
    }
    @Override
    public GioHangResponse create(GioHangRequest request) {

        return null;
    }

    private GioHangResponse conver(GioHang gioHang){
        GioHangResponse gioHangResponse = new GioHangResponse();
        gioHangResponse.setId(gioHang.getId());
        gioHangResponse.setIdKhachHang(gioHang.getId());
        gioHangResponse.setTongSoLuong(gioHang.getTongSoLuong());
        return gioHangResponse;
    }
}
