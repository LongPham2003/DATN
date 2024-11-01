package com.example.shoes.controller;
import com.example.shoes.dto.BaoCaoThongKeResponse;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;

import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadon.response.HoaDonTheoIDResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.repository.HoaDonRepo;
import com.example.shoes.service.HoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/banhangtaiquay")
public class BanHangTaiQuayController {
    @Autowired
    private HoaDonService hoaDonService;
@Autowired
private HoaDonRepo hoaDonRepo;
    // tạo hóa đon moi
    @PostMapping("/taodon")
    public ApiResponse<HoaDonResponse> createHoaDon() {
        HoaDonResponse hoaDonResponse = hoaDonService.createHoaDon();
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @PostMapping("/thanhtoan/{idhoadon}")
    public ApiResponse<String> thanhToan(
            @PathVariable("idhoadon") Integer idhoadon,
            @RequestBody HoaDonRequest hoaDonRequest) {
        hoaDonService.thanhToan(idhoadon, hoaDonRequest);
        return ApiResponse.<String>builder()
                .message("thanh toan thanh cong")
                .build();
    }

    @PostMapping("/hoadon/addspct/{id}")
    public ApiResponse<HoaDonResponse> addSanPhamChiTietToHoaDon(
            @PathVariable Integer id,
            @RequestBody HoaDonChiTietRequest chiTietRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.addSanPhamChiTietToHoaDon(id, chiTietRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }


    // Cập nhật số luọng sp trong  hóa đơn chi tiết
    @PutMapping("/hoadon/update/{id}")
    public ApiResponse<HoaDonResponse> updateHoaDon(
            @PathVariable("id") Integer id,
            @RequestBody HoaDonChiTietRequest hoaDonRequest) {
        HoaDonResponse updatedHoaDon = hoaDonService.updateHoaDon(id, hoaDonRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(updatedHoaDon)
                .build();
    }

    // Tìm hóa đơn theo ID
    @GetMapping("/hoadon/{id}")
    public ApiResponse<HoaDonResponse> findHoaDonById(@PathVariable("id") Integer id) {
        HoaDonResponse hoaDonResponse = hoaDonService.findByid(id);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    // Xóa hóa đơn
    @PutMapping ("/hoadon/delete/{id}")
    public ApiResponse<String> deleteHoaDon(@PathVariable("id") Integer idHoaDon) {
        hoaDonService.deleteHoaDon(idHoaDon);
        return ApiResponse.<String>builder()
                .message("Xóa hóa đơn thành công")
                .build();
    }

    // Lấy tất cả hóa đơn
    @GetMapping("/hoadon/all")
    public ApiResponse<List<HoaDonResponse>> getAllHoaDon() {
        List<HoaDonResponse> hoaDonResponses = hoaDonService.getAllHoaDon();
        return ApiResponse.<List<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }
    @PostMapping("/hoadon/{id}/voucher/{idPhieuGiamGia}")
    public ApiResponse<String> apPhieuGiamGia(
            @PathVariable Integer id,
            @PathVariable Integer idPhieuGiamGia) {

            hoaDonService.apPhieuGiamGiaHoaDon(id, idPhieuGiamGia);
            return ApiResponse.<String>builder()
                    .message("Áp dụng phiếu giảm giá thành công")
                    .build();
    }
    @DeleteMapping("/hoadon/delete/{id}/voucher/{idPhieuGiamGia}")
    public ApiResponse<String> xoaPhieuGiamGia(
            @PathVariable Integer id,
            @PathVariable Integer idPhieuGiamGia) {

        hoaDonService.xoaPhieuGiamGiaHoaDon(id, idPhieuGiamGia);
        return ApiResponse.<String>builder()
                .message("Xóa phiếu giảm giá khỏi hóa đơn thành công")
                .build();
    }


//    get tong tiền ,tien duoc giam,tien phai thanh toan theo idhoadon

    // Lay thong tin tien theo idHoaDon


    @GetMapping("/hoadon/gettheoid/{idHoaDon}")
    public ApiResponse<HoaDonTheoIDResponse> getTheoIdHoaDon(@PathVariable Integer idHoaDon) {
        HoaDonTheoIDResponse hoaDonResponse = hoaDonService.getTheoIdHoaDon(idHoaDon);
        return ApiResponse.<HoaDonTheoIDResponse>builder()
                .result(hoaDonResponse)
                .build();
    }


    @GetMapping("/theo-ngay")
    public ApiResponse<List<BaoCaoThongKeResponse>> layBaoCaoTaiChinhTheoNgay(
            @RequestParam LocalDate ngayBatDau,
            @RequestParam LocalDate ngayKetThuc) {
        List<BaoCaoThongKeResponse> responses = hoaDonService.layBaoCaoTaiChinhTheoNgay(ngayBatDau, ngayKetThuc);

        return ApiResponse.<List<BaoCaoThongKeResponse>>builder()
                .result(responses)
                .build();
    }

    @GetMapping("/theo-thang")
    public ApiResponse<List<BaoCaoThongKeResponse>> layBaoCaoTaiChinhTheoThang(

            @RequestParam LocalDate ngayBatDau,
            @RequestParam LocalDate ngayKetThuc) {
        List<BaoCaoThongKeResponse> responses =hoaDonService.layBaoCaoTaiChinhTheoThang(ngayBatDau, ngayKetThuc);

        return ApiResponse.<List<BaoCaoThongKeResponse>>builder()
                .result(responses)
                .build();
    }

    @GetMapping("/theo-nam")
    public ApiResponse<List<BaoCaoThongKeResponse>> layBaoCaoTaiChinhTheoNam(

            @RequestParam LocalDate ngayBatDau,
            @RequestParam LocalDate ngayKetThuc) {
        List<BaoCaoThongKeResponse> responses = hoaDonService.layBaoCaoTaiChinhTheoNam(ngayBatDau, ngayKetThuc);

        return ApiResponse.<List<BaoCaoThongKeResponse>>builder()
                .result(responses)
                .build();
    }


    @GetMapping("/tong-quat")
    public ApiResponse<BaoCaoThongKeResponse> layBaoCaoTaiChinhTongQuuat() {
        BaoCaoThongKeResponse response = hoaDonService.layBaoCaoTaiChinhTongQuat();
        return ApiResponse.<BaoCaoThongKeResponse>builder()
                .result(response)
                .build();
    }

    // API để xuất hóa đơn theo ID
    @GetMapping("/xuathoadon/{id}")
    public String xuatHoaDon(@PathVariable Integer id) {
        return hoaDonService.xuatHoaDon(id);
    }

}
