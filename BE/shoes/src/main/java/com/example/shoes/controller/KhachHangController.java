package com.example.shoes.controller;

import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/khachhang")
public class KhachHangController {
    @Autowired
    KhachHangService khachHangService;

    @GetMapping("/getall")
    public ApiResponse<List<KhachHangResponse>> getAll(){
        return ApiResponse.<List<KhachHangResponse>>builder()
                .result(khachHangService.findAll())
                .build();
    }
}
