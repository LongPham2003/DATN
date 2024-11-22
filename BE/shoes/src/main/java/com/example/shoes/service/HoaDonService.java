package com.example.shoes.service;

import com.example.shoes.dto.BaoCaoThongKeResponse;
import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.hoadon.request.DatHangRequest;
import com.example.shoes.dto.hoadon.request.GhiChu;
import com.example.shoes.dto.hoadon.request.HoaDonRequest;

import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.payment.PaymentRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;

import com.example.shoes.entity.HoaDon;
import com.example.shoes.enums.TrangThai;


import java.time.LocalDate;
import java.util.List;

public interface HoaDonService {
 HoaDonResponse createHoaDon();
 HoaDonResponse updateHoaDon( Integer id,HoaDonChiTietRequest chiTietRequest);
 HoaDonResponse findByid(Integer id);
 HoaDonResponse deleteHoaDon(Integer idHoaDon);
 List<HoaDonResponse> getAllHoaDon();
 void thanhToan(Integer idHoaDon, HoaDonRequest hoaDonRequest);
 HoaDonResponse addSanPhamChiTietToHoaDon(Integer idHoaDon, HoaDonChiTietRequest chiTietRequest);
 void apPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia);
 List<HoaDonResponse> getAllTrangThaiDaThanhToan();
 List<HoaDonResponse> getAllTrangThaiChuaThanhToan();
 void xoaPhieuGiamGiaHoaDon(Integer idHoaDon, Integer idPhieuGiamGia);
 HoaDonTheoIDResponse getTheoIdHoaDon(Integer idHoaDon);
 HoaDonResponse addKhachHangHoaDon(Integer idHoaDon, Integer idKhachHang);
 HoaDonResponse xoaKhachHangHoaDon(Integer idHoaDon, Integer idKhachHang);

 Integer idHoaDon();
 Void updateHoaDonById(Integer idHoaDon , PaymentRequest paymentRequest);
 Void updateTrangThaiHoaDonByIdChoVanChuyen(Integer idHoaDon, GhiChu moTa );
 Void updateTrangThaiHoaDonByIdGiaoHang(Integer idHoaDon ,GhiChu moTa);
 Void updateTrangThaiHoaDonByIdThanhCong(Integer idHoaDon,GhiChu moTa );
 PhanTrangResponse<HoaDonResponse> getHoaDon(int pageNumber,int pageSize,String keyword,String phuongThucGiaoHang,String trangThai);
 Void updateTrangThaiHoaDonById(Integer idHoaDon, DatHangRequest datHangRequest);
}
