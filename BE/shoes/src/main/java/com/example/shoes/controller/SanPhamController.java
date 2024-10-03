package com.example.shoes.controller;


import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;
    @GetMapping("/list")
    public ApiResponse<List<SanPhamResponse>> getAll() {
        List<SanPhamResponse> sanPhamResponse = sanPhamService.findAll();
        return ApiResponse.<List<SanPhamResponse>>builder()
                .result(sanPhamResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SanPhamResponse> getById(@PathVariable Integer id) {
        SanPhamResponse sanPhamResponse = sanPhamService.getById(id);
        return ApiResponse.<SanPhamResponse>builder()
                .result(sanPhamResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<SanPhamResponse> create(@RequestBody SanPhamRequest request) {
        SanPhamResponse sanPhamResponse = sanPhamService.create(request);
        return ApiResponse.<SanPhamResponse>builder()
                .result(sanPhamResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SanPhamResponse> update(@PathVariable Integer id, @RequestBody SanPhamRequest request) {
        SanPhamResponse updated = sanPhamService.update(id, request);
        return ApiResponse.<SanPhamResponse>builder()
                .result(updated)
                .build();
    }
}