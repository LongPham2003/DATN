package com.example.shoes.controller;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/taiquay")
public class BanHangTaiQuayController {
    @Autowired
    private HoaDonService hoaDonService;

    // tạo hóa đon moi
    @PostMapping("/taodon")
    public ApiResponse<HoaDonResponse> createHoaDon(@RequestBody HoaDonRequest hoaDonRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.createHoaDon(hoaDonRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @PostMapping("/thanhtoan/{idhoadon}")
    public ApiResponse<String> thanhToan(
            @PathVariable("idhoadon") Integer idhoadon,
            @RequestBody PhuongThucThanhToanRequest phuongThucThanhToanRequest) {
        hoaDonService.thanhToan(idhoadon, phuongThucThanhToanRequest);
        return ApiResponse.<String>builder()
                .message("thanh toan thanh cong")
                .build();
    }

    @PostMapping("/hoadon/{id}/add-spct")
    public ApiResponse<HoaDonResponse> addSanPhamChiTietToHoaDon(
            @PathVariable Integer id,
            @RequestBody HoaDonChiTietRequest chiTietRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.addSanPhamChiTietToHoaDon(id, chiTietRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }
    // Cập nhật hóa đơn
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
    @DeleteMapping ("/hoadon/delete/{id}")
    public ApiResponse<String> deleteHoaDon(@PathVariable("id") Integer id) {
        hoaDonService.deleteHoaDon(id);
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
}
