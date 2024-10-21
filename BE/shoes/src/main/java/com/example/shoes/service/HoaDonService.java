package com.example.shoes.service;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.entity.HoaDon;

import java.util.List;

public interface HoaDonService {
 HoaDonResponse createHoaDon(HoaDonRequest hoaDonRequest);
 HoaDonResponse updateHoaDon( Integer id,HoaDonChiTietRequest chiTietRequest);
 HoaDonResponse findByid(Integer id);
 HoaDonResponse deleteHoaDon(Integer id);
 List<HoaDonResponse> getAllHoaDon();
 void thanhToan(Integer idHoaDon, PhuongThucThanhToanRequest phuongThucThanhToanRequest);
 HoaDonResponse addSanPhamChiTietToHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest);
 void apPhieuGiamGiaHoaDon(HoaDon hoaDon, Integer idPhieuGiamGia);
}
