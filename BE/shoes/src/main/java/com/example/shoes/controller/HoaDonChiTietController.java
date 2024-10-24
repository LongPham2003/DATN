package com.example.shoes.controller;

import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hoadonchitiet")
public class HoaDonChiTietController {
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;
    @GetMapping("/list")
    public ApiResponse<List<HoaDonChiTietResponse>> getAllT() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<HoaDonChiTietResponse> hoaDonChiTietResponses = hoaDonChiTietService.getAllHoaDonCT();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<HoaDonChiTietResponse>>builder()
                .result(hoaDonChiTietResponses)
                .build();
    }
}
