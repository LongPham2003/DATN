package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
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

        System.out.println("long");
        return ApiResponse.<List<KhachHangResponse>>builder()
                .result(khachHangService.findAll())
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<PhanTrangResponse<KhachHang>> search(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {

        PhanTrangResponse<KhachHang> list = khachHangService.getKhachHang(pageNumber, pageSize, keyword);

        return ApiResponse.<PhanTrangResponse<KhachHang>>builder()
                .result(list).build();
    }


    @PostMapping("/add")
    public ApiResponse<KhachHang> add(@RequestBody  KhachHangRequest request){
        return ApiResponse.<KhachHang>builder()
                .result(khachHangService.add(request))
                .build();
    }

    @PostMapping("/update")
    public ApiResponse<KhachHang> update(@RequestBody  KhachHangRequest request){
        return ApiResponse.<KhachHang>builder()
                .result(khachHangService.update(request))
                .build();
    }
}
