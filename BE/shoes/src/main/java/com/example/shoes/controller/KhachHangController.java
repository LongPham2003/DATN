package com.example.shoes.controller;

import com.example.shoes.dto.khachhang.request.KhachHangRequest;
import com.example.shoes.dto.khachhang.response.KhachHangResponse;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping("/add")
    public ApiResponse<KhachHang> add(@RequestBody  KhachHangRequest request){
        return ApiResponse.<KhachHang>builder()
                .result(khachHangService.add(request))
                .build();
    }
}
