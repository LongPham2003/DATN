package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;
import com.example.shoes.entity.PhieuGiamGia;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/phieugiamgia")
public class PhieuGiamGiaController {
    @Autowired
    private PhieuGiamGiaService phieuGiamGiaService;

    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<PhieuGiamGia>> getAllPhieuGiamGia(
            @RequestParam(value = "tenVoucher", defaultValue = "") String tenVoucher,
            @RequestParam(value = "dieuKienGiamGia", defaultValue = "") String dieuKienGiamGia,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai,
            @RequestParam(value = "ngayBatDau", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayBatDau,
            @RequestParam(value = "ngayKetThuc", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayKetThuc,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<PhieuGiamGia> phieuGiamGia = phieuGiamGiaService.getPhieuGiamGia(pageNumber, pageSize, keyword,tenVoucher, dieuKienGiamGia, trangThai, ngayBatDau, ngayKetThuc);
        return ApiResponse.<PhanTrangResponse<PhieuGiamGia>>builder()
                .result(phieuGiamGia)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PhieuGiamGiaResponse> getById(@PathVariable Integer id ) {
        PhieuGiamGiaResponse phieuGiamGiaResponse = phieuGiamGiaService.getById(id);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(phieuGiamGiaResponse)
                .build();
    }

    @PostMapping("/add")
    public ApiResponse<PhieuGiamGiaResponse> create(@RequestBody PhieuGiamGiaRequest request) {
        PhieuGiamGiaResponse phieuGiamGiaResponse = phieuGiamGiaService.create(request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(phieuGiamGiaResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<PhieuGiamGiaResponse> update(@PathVariable Integer id, @RequestBody PhieuGiamGiaRequest request) {
        PhieuGiamGiaResponse updated = phieuGiamGiaService.update(id, request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(updated)
                .build();
    }

    @PutMapping("/delete/{id}")
    public ApiResponse<PhieuGiamGiaResponse> delete(@PathVariable Integer id, @RequestBody PhieuGiamGiaRequest request) {
        PhieuGiamGiaResponse updated = phieuGiamGiaService.delete(id, request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(updated)
                .build();
    }


}
