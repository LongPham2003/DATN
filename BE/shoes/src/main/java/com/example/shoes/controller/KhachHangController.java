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

        return ApiResponse.<List<KhachHangResponse>>builder()
                .result(khachHangService.findAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<KhachHang> getById(@PathVariable int id){
        return ApiResponse.<KhachHang>builder()
                .result(khachHangService.getById(id))
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<PhanTrangResponse<KhachHang>> search(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai
    ) {

        PhanTrangResponse<KhachHang> list = khachHangService.getKhachHang(pageNumber, pageSize, keyword,trangThai);

        return ApiResponse.<PhanTrangResponse<KhachHang>>builder()
                .result(list).build();
    }


    @PostMapping("/add")
    public ApiResponse<KhachHang> add(@RequestBody  KhachHangRequest request){
        return ApiResponse.<KhachHang>builder()
                .result(khachHangService.add(request))
                .build();
    }

    @PostMapping("/update/{id}")
    public ApiResponse<KhachHang> update(@PathVariable("id") Integer id, @RequestBody  KhachHangRequest request){
        return ApiResponse.<KhachHang>builder()
                .result(khachHangService.update(id,request))
                .build();
    }
}
