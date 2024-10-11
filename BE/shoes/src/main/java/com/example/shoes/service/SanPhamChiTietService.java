package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamChiTietService {
    PhanTrangResponse<SanPhamChiTietResponse> getSanPhamChiTiet(int pageNumber, int pageSize);
    SanPhamChiTietResponse getById(Integer id);
    SanPhamChiTietResponse create(SanPhamChiTietRequest request);
    SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request);
    List<SanPhamChiTietResponse> locPhamChiTietList(String tenSanPham, String tenMauSac, String kichThuoc, String tenChatLieu, String tenThuongHieu, String tenDeGiay, Boolean trangThai, BigDecimal minDonGia, BigDecimal maxDonGia);
    List<SanPhamChiTietResponse> getAll();
    void updateTheoTrangThai(Integer id);
}
