package com.example.shoes.service;

import com.example.shoes.dto.BaoCaoThongKeResponse;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;

import java.time.LocalDate;
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
 HoaDonTheoIDResponse getTheoIdHoaDon(Integer idHoaDon);
 List<BaoCaoThongKeResponse> layBaoCaoTaiChinhTheoNgay(LocalDate startDate, LocalDate endDate);
 List<BaoCaoThongKeResponse> layBaoCaoTaiChinhTheoThang(LocalDate startDate, LocalDate endDate);
 List<BaoCaoThongKeResponse> layBaoCaoTaiChinhTheoNam(LocalDate startDate, LocalDate endDate);
 BaoCaoThongKeResponse layBaoCaoTaiChinhTongQuat();
 String xuatHoaDon(Integer idHoaDon);
}
