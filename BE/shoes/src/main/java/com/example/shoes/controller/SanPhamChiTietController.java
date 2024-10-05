package com.example.shoes.controller;

import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sanphamchitiet")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;
    @GetMapping("/list")
    public ApiResponse<List<SanPhamChiTietResponse>> getAll() {
        List<SanPhamChiTietResponse> sanPhamChiTietResponses = sanPhamChiTietService.findAll();
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(sanPhamChiTietResponses)
                .build();
    }
}
