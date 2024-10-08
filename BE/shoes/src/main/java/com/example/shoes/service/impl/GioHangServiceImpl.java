package com.example.shoes.service.impl;

import com.example.shoes.entity.GioHang;
import com.example.shoes.entity.GioHangChiTiet;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.repository.GioHangChiTietRepo;
import com.example.shoes.repository.GioHangRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.GioHangService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Transactional
    @Override
    public void addSanPhamToGioHang(Integer khachHangId, Integer sanPhamChiTietId, Integer soLuong) {
////         Lấy giỏ hàng của khách hàng hoặc tạo mới nếu chưa có
//        GioHang gioHang =gioHangRepo.findById(khachHangId).get()
//                .orElseGet(() -> {
//                    GioHang newGioHang = new GioHang();
//                    newGioHang.setIdKhachHang(khachHangRepo.findById(khachHangId)
//                            .orElseThrow(() -> new EntityNotFoundException("Khách hàng không tồn tại!")));
//                    return gioHangRepo.save(newGioHang);
//                });
//
//        // Lấy sản phẩm chi tiết và kiểm tra tồn kho
//        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(sanPhamChiTietId)
//                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sản phẩm chi tiết!"));
//        if (sanPhamChiTiet.getSoLuong() < soLuong) {
//            throw new IllegalArgumentException("Số lượng sản phẩm không du!");
//        }
//
//        // Tìm kiếm sản phẩm chi tiết trong giỏ hàng hoặc tạo mới
//        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepo.findByGioHangIdAndSanPhamChiTietId(gioHang.getId(), sanPhamChiTietId)
//                .orElse(new GioHangChiTiet());
//        gioHangChiTiet.setIdGioHang(gioHang);
//        gioHangChiTiet.setIdSanPhamChiTiet(sanPhamChiTiet);
//        gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong() + soLuong);
//        gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia());
//
//        // Lưu chi tiết giỏ hàng và cập nhật giỏ hàng
//        gioHangChiTietRepo.save(gioHangChiTiet);
//        gioHang.setTongSoLuong(gioHang.getTongSoLuong() + soLuong); // Cập nhật tổng số lượng
//        gioHangRepo.save(gioHang);
    }
}
