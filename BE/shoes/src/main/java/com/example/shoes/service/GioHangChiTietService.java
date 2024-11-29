package com.example.shoes.service;

import com.example.shoes.dto.giohang.response.GioHangResponse;
import com.example.shoes.dto.giohangchitiet.request.GioHangChiTietRequest;
import com.example.shoes.dto.giohangchitiet.response.GioHangChiTietResponse;
import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.entity.GioHangChiTiet;

import java.util.List;

public interface GioHangChiTietService {
    GioHangChiTietResponse themVaoGioHangChiTiet(Integer idSPCT,GioHangChiTietRequest request);
    GioHangChiTietResponse updateGioHangChiTiet(Integer idGH, GioHangChiTietRequest request);
    GioHangChiTietResponse findByid(Integer id);
    GioHangChiTietResponse deleteGioHangChiTiet(Integer idgiohangchitiet);
    GioHangChiTietResponse fibindIdGHCT(Integer idGHCT);
    List<GioHangChiTietResponse> getAllGioHangChiTiet();
    HoaDonResponse muaNgay(Integer idSPCT, HoaDonChiTietRequest chiTietRequest);
    HoaDonResponse muaHangTuGioHangChiTiet(List<HoaDonChiTietRequest> chiTietRequests);
    void thanhToan(Integer idHoaDon, HoaDonRequest hoaDonRequest);
    HoaDonResponse datHang( HoaDonRequest hoaDonRequest);
    HoaDonResponse datHangVNPay( HoaDonRequest hoaDonRequest);
    HoaDonResponse nhanVienXacNhan(Integer idHoaDon);
    GioHangResponse layGioHangTheoIdKhachHang();

}
