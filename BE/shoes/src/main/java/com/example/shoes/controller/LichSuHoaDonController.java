package com.example.shoes.controller;

import com.example.shoes.dto.lichsuhoadon.response.LichSuHoaDonResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lichsuhoadon")
public class LichSuHoaDonController {
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;
    @GetMapping("/list")
    public ApiResponse<List<LichSuHoaDonResponse>> getAllT() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<LichSuHoaDonResponse> lichSuHoaDonResponses = lichSuHoaDonService.getAll();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<LichSuHoaDonResponse>>builder()
                .result(lichSuHoaDonResponses)
                .build();
    }
}
