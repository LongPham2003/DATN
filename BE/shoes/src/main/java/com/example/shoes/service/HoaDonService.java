package com.example.shoes.service;

import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import java.util.List;

public interface HoaDonService {
 HoaDonResponse createHoaDon();
 HoaDonResponse updateHoaDon( Integer id,HoaDonChiTietRequest chiTietRequest);
 HoaDonResponse findByid(Integer id);
 HoaDonResponse deleteHoaDon(Integer idHoaDon);
 List<HoaDonResponse> getAllHoaDon();
 void thanhToan(Integer idHoaDon, PhuongThucThanhToanRequest phuongThucThanhToanRequest);
 HoaDonResponse addSanPhamChiTietToHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest);
 void apPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia);
 List<HoaDonResponse> getAllTrangThaiDaThanhToan();
 List<HoaDonResponse> getAllTrangThaiChuaThanhToan();
 void xoaPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia);
}
