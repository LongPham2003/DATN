package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;

import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sanphamchitiet")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;
    @GetMapping("/list")
   public ApiResponse<PhanTrangResponse<SanPhamChiTietResponse>> getAllChatLieu(
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<SanPhamChiTietResponse> sanPhamPhanTrangResponse = sanPhamChiTietService.getSanPhamChiTiet(pageNumber, pageSize);
        return ApiResponse.<PhanTrangResponse<SanPhamChiTietResponse>>builder()
                .result(sanPhamPhanTrangResponse)
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<SanPhamChiTietResponse> getById(@PathVariable Integer id) {
        SanPhamChiTietResponse sanPhamChiTietResponse = sanPhamChiTietService.getById(id);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(sanPhamChiTietResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<SanPhamChiTietResponse> create(@RequestBody SanPhamChiTietRequest request) {
        SanPhamChiTietResponse sanPhamChiTietResponse = sanPhamChiTietService.create(request);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(sanPhamChiTietResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SanPhamChiTietResponse> update(@PathVariable Integer id, @RequestBody SanPhamChiTietRequest request) {
        SanPhamChiTietResponse updated = sanPhamChiTietService.update(id, request);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(updated)
                .build();
    }
    @GetMapping("/loc")
    public ApiResponse<List<SanPhamChiTietResponse>> loc(
            @RequestParam(required = false) String sanPham,
            @RequestParam(required = false) String mauSac,
            @RequestParam(required = false) String kichThuoc,
            @RequestParam(required = false) String chatLieu,
            @RequestParam(required = false) String thuongHieu,
            @RequestParam(required = false) String deGiay,
            @RequestParam(defaultValue = "true") boolean trangThai) {
        List<SanPhamChiTietResponse> responses = sanPhamChiTietService.locSanPhamChiTiet(sanPham, mauSac, kichThuoc, chatLieu, thuongHieu, deGiay, trangThai);
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(responses)
                .build();
    }
}
