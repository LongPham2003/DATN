package com.example.shoes.controller;

import com.example.shoes.dto.taikhoan.response.TaiKhoanResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.TaikhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/taikhoan")
public class TaiKhoanController {
    @Autowired
    TaikhoanService taikhoanService;

    @GetMapping("/getall")
    public ApiResponse<List<TaiKhoanResponse>> getAllTaiKhoan() {
        return ApiResponse.<List<TaiKhoanResponse>>builder()
                .result(taikhoanService.finAllTaiKhoan()).build();
    }
}
