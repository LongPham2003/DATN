package com.example.shoes.service.impl;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.LichSuHoaDonRepo;
import com.example.shoes.repository.NhanVienRepo;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HoaDonServiceImpl implements HoaDonService {
    @Autowired
    private HoaDonRepo hoaDonRepo;
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;
    @Autowired
    private LichSuHoaDonRepo lichSuHoaDonRepo;
    @Autowired
    private NhanVienRepo nhanVienRepo;
    @Autowired
    private KhachHangRepo khachHangRepo;

    @Override
    public HoaDonResponse createHoaDon(HoaDonRequest hoaDonRequest) {
        NhanVien nhanVien = nhanVienRepo.findById(hoaDonRequest.getIdNhanVien())
                .orElseThrow(() -> new AppException(ErrorCode.STAFF));
        KhachHang khachHang = khachHangRepo.findById(hoaDonRequest.getIdKhachHang())
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER));
        // Tạo mới hóa đơn
        HoaDon hoaDon = new HoaDon();
        hoaDon.setIdKhachHang(khachHang);
        hoaDon.setIdNhanVien(nhanVien);
        hoaDon.setSoDienThoai(hoaDonRequest.getSoDienThoai());
        hoaDon.setDiaChiGiaoHang(hoaDonRequest.getDiaChiGiaoHang());
        hoaDon.setTongTien(hoaDonRequest.getTongTien());
        hoaDon.setTienPhaiThanhToan(hoaDonRequest.getTienPhaiThanhToan());
        hoaDon.setPhuongThucThanhToan(hoaDonRequest.getPhuongThucThanhToan());
        hoaDon.setPhuongThucGiaoHang(hoaDonRequest.getPhuongThucGiaoHang());
        hoaDon.setNgayTao(LocalDate.now());
        hoaDon.setTrangThai(false);  // Chưa thanh toán
        HoaDon savehoadon = hoaDonRepo.save(hoaDon);
        return converToHoaDonResponse(savehoadon);
    }

    @Override
    public HoaDonResponse updateHoaDon(Integer id, HoaDonRequest hoaDonRequest) {
        return null;
    }

    @Override
    public HoaDonResponse findByid(Integer id) {
        return null;
    }

    @Override
    public HoaDonResponse deleteHoaDon(Integer id) {
        return null;
    }

    @Override
    public List<HoaDonResponse> getAllHoaDon() {
        return List.of();
    }

    private HoaDonResponse converToHoaDonResponse(HoaDon hoaDon) {
        HoaDonResponse hoaDonResponse = new HoaDonResponse();
        hoaDonResponse.setId(hoaDon.getId());
        hoaDonResponse.setTenNhanVien(hoaDon.getIdNhanVien() != null ? hoaDon.getIdNhanVien().getHoTen() : null);
        hoaDonResponse.setTenKhachHang(hoaDon.getIdKhachHang() != null ? hoaDon.getIdKhachHang().getHoTen() : null);
        hoaDonResponse.setSoDienThoai(hoaDon.getSoDienThoai());
        hoaDonResponse.setDiaChiGiaoHang(hoaDon.getDiaChiGiaoHang());
        hoaDonResponse.setTongTien(hoaDon.getTongTien());
        hoaDonResponse.setTienDuocGiam(hoaDon.getTienDuocGiam());
        hoaDonResponse.setTienPhaiThanhToan(hoaDon.getTienPhaiThanhToan());
        hoaDonResponse.setNgayTao(hoaDon.getNgayTao());
        hoaDonResponse.setTrangThai(hoaDon.getTrangThai());
        return hoaDonResponse;
    }
}
