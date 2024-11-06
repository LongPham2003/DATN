package com.example.shoes.controller;

import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;
    @GetMapping("/getall-dathanhtoan")
    public ApiResponse<List<HoaDonResponse>> getAllDaThanhToan() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<HoaDonResponse> hoaDonResponses = hoaDonService.getAllTrangThaiDaThanhToan();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }
    @GetMapping("/getall-chuathanhtoan")
    public ApiResponse<List<HoaDonResponse>> getAllChuaThanhToan() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<HoaDonResponse> hoaDonResponses = hoaDonService.getAllTrangThaiChuaThanhToan();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<HoaDonResponse>>builder()
                .result(hoaDonResponses)
                .build();
    }

    @PostMapping("/{idHoaDon}/addkhachhang/{idKhachHang}")
    public ApiResponse<HoaDonResponse> addKhachHang(
            @PathVariable("idHoaDon") Integer idHoaDon,
            @PathVariable("idKhachHang") Integer idKhachHang
    ) {

        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonService.addKhachHangHoaDon(idHoaDon,idKhachHang))
                .build();
    }

    @PostMapping("/{idHoaDon}/deletekhachhang/{idKhachHang}")
    public ApiResponse<HoaDonResponse> deleteKhachHang(
            @PathVariable("idHoaDon") Integer idHoaDon,
            @PathVariable("idKhachHang") Integer idKhachHang
    ) {
        HoaDonResponse hoaDonResponse = hoaDonService.xoaKhachHangHoaDon(idHoaDon,idKhachHang);

        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }

    @GetMapping("/da-thanh-toan/id-lon-nhat")
    public ApiResponse<Integer> idLonNhat() {
        Integer id = hoaDonService.idHoaDon();
        return ApiResponse.<Integer>builder().result(id).build();
    }
    @PostMapping("/thanh-toan/tc-vnpay/{id}")
    private ApiResponse<Void> tc(@PathVariable Integer id){
      return ApiResponse.<Void>builder().result(hoaDonService.updateHoaDonById(id)).build();
    }
}
