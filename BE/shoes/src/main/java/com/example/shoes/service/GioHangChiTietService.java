package com.example.shoes.service;

import com.example.shoes.dto.giohangchitiet.request.GioHangChiTietRequest;
import com.example.shoes.dto.giohangchitiet.response.GioHangChiTietResponse;
import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;

import java.util.List;

public interface GioHangChiTietService {
    GioHangChiTietResponse themVaoGioHangChiTiet(GioHangChiTietRequest request);
    GioHangChiTietResponse updateGioHangChiTiet(Integer id, GioHangChiTietRequest request);
    GioHangChiTietResponse findByid(Integer id);
    GioHangChiTietResponse deleteGioHangChiTiet(Integer idgiohangchitiet);
    List<GioHangChiTietResponse> getAllGioHangChiTiet();
    HoaDonResponse muaNgay(Integer idSPCT, HoaDonChiTietRequest chiTietRequest);
    HoaDonResponse muaHangTuGioHangChiTiet(List<HoaDonChiTietRequest> chiTietRequests);
    void thanhToan(Integer idHoaDon, HoaDonRequest hoaDonRequest);
    HoaDonResponse datHang(Integer idHoaDon, HoaDonRequest hoaDonRequest);
    HoaDonResponse nhanVienXacNhan(Integer idHoaDon);
}
