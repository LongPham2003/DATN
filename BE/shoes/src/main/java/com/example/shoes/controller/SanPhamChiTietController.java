package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;

import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    public ApiResponse<List<SanPhamChiTietResponse>> locSanPhamChiTiet(
            @RequestParam(required = false) String tenSanPham,
            @RequestParam(required = false) String tenMauSac,
            @RequestParam(required = false) String kichThuoc,
            @RequestParam(required = false) String tenChatLieu,
            @RequestParam(required = false) String tenThuongHieu,
            @RequestParam(required = false) String tenDeGiay,
            @RequestParam(required = false) Boolean trangThai,
            @RequestParam(required = false) BigDecimal minDonGia,
            @RequestParam(required = false) BigDecimal maxDonGia
    ) {
        // Gọi service để lọc sản phẩm chi tiết
        List<SanPhamChiTietResponse> responses = sanPhamChiTietService.locPhamChiTietList(
                tenSanPham, tenMauSac, kichThuoc, tenChatLieu, tenThuongHieu, tenDeGiay, trangThai, minDonGia, maxDonGia);

        // Trả về API response
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(responses)
                .build();
    }
}
