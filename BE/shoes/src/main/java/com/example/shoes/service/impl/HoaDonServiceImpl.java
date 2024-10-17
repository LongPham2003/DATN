package com.example.shoes.service.impl;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.entity.HoaDon;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.LichSuHoaDon;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.entity.PhuongThucThanhToan;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.LichSuHoaDonRepo;
import com.example.shoes.repository.NhanVienRepo;
import com.example.shoes.repository.PhuongThucThanhToanRepo;
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

    @Autowired
    private PhuongThucThanhToanRepo phuongThucThanhToanRepo;

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
        hoaDon.setTienDuocGiam(hoaDonRequest.getTienDuocGiam());
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

    @Override
    public void thanhToan(Integer idHoaDon, PhuongThucThanhToanRequest phuongThucThanhToanRequest) {
        // Tìm hóa đơn
        HoaDon hoaDon = hoaDonRepo.findById(idHoaDon)
                .orElseThrow(() -> new IllegalArgumentException("Hóa đơn không tồn tại."));

        // Kiểm tra phương thức thanh toán
        if (phuongThucThanhToanRequest == null || phuongThucThanhToanRequest.getTenPhuongThuc() == null) {
            throw new IllegalArgumentException("Phương thức thanh toán không hợp lệ.");
        }

        // Lưu phương thức thanh toán
        PhuongThucThanhToan phuongThucThanhToan = new PhuongThucThanhToan();
        phuongThucThanhToan.setIdHoaDon(hoaDon);
        phuongThucThanhToan.setTenPhuongThuc(phuongThucThanhToanRequest.getTenPhuongThuc());
        phuongThucThanhToan.setGhiChu(phuongThucThanhToanRequest.getGhiChu());
        phuongThucThanhToanRepo.save(phuongThucThanhToan);

        // Cập nhật trạng thái thanh toán của hóa đơn
        hoaDon.setTrangThai(true);
        hoaDonRepo.save(hoaDon);

        // Trừ số lượng sản phẩm chi tiết
        for (HoaDonChiTiet hoaDonChiTiet : hoaDon.getHoaDonChiTiets()) {
            SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.getIdSpct();
            sanPhamChiTiet.setSoLuong(sanPhamChiTiet.getSoLuong() - hoaDonChiTiet.getSoLuong());
            sanPhamChiTietRepo.save(sanPhamChiTiet);
        }

        // Chuyển sang lịch sử hóa đơn
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHoaDon(hoaDon);
        lichSuHoaDon.setMoTa("Thanh toán thành công.");
        lichSuHoaDon.setThoiGian(LocalDate.now());
        lichSuHoaDon.setNguoiThucHien("Hệ thống");
        lichSuHoaDonRepo.save(lichSuHoaDon);
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
        hoaDonResponse.setPhuongThucThanhToan(hoaDon.getPhuongThucThanhToan());
        hoaDonResponse.setPhuongThucGiaoHang(hoaDon.getPhuongThucGiaoHang());
        hoaDonResponse.setNgayTao(hoaDon.getNgayTao());
        hoaDonResponse.setTrangThai(hoaDon.getTrangThai());
        return hoaDonResponse;
    }
}
