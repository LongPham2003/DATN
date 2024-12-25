package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaUpdateRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;
import com.example.shoes.entity.PhieuGiamGia;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.PhieuGiamGiaService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/phieugiamgia")
public class PhieuGiamGiaController
{
    @Autowired
    private PhieuGiamGiaService phieuGiamGiaService;

    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<PhieuGiamGiaResponse>> getAllPhieuGiamGia(
            @RequestParam(value = "tenVoucher", defaultValue = "") String tenVoucher,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "trangThai", required = false) String trangThai,
            @RequestParam(value = "ngayBatDau", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime ngayBatDau,
            @RequestParam(value = "ngayKetThuc", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime ngayKetThuc,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    )
    {
        PhanTrangResponse<PhieuGiamGiaResponse> phieuGiamGia = phieuGiamGiaService.getPhieuGiamGia(pageNumber, pageSize,
                keyword, tenVoucher, trangThai, ngayBatDau, ngayKetThuc);
        return ApiResponse.<PhanTrangResponse<PhieuGiamGiaResponse>>builder()
                .result(phieuGiamGia).build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PhieuGiamGiaResponse> getById(@PathVariable Integer id)
    {
        PhieuGiamGiaResponse phieuGiamGia = phieuGiamGiaService.getById(id);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(phieuGiamGia)
                .build();
    }

    @PostMapping("/add")
    public ApiResponse<PhieuGiamGiaResponse> create(@Valid @RequestBody PhieuGiamGiaRequest request,
            BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
        PhieuGiamGiaResponse phieuGiamGiaResponse = phieuGiamGiaService.create(request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(phieuGiamGiaResponse)
                .build();
    }

    @PostMapping("/update/{id}")
    public ApiResponse<PhieuGiamGiaResponse> update(@Valid @RequestBody PhieuGiamGiaUpdateRequest request,
            BindingResult bindingResult, @PathVariable Integer id)
    {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
        PhieuGiamGiaResponse updated = phieuGiamGiaService.update(id, request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(updated)
                .build();
    }

    @PutMapping("/delete/{id}")
    public ApiResponse<PhieuGiamGiaResponse> delete(@PathVariable Integer id, @RequestBody PhieuGiamGiaRequest request)
    {
        PhieuGiamGiaResponse updated = phieuGiamGiaService.delete(id, request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(updated)
                .build();
    }

    @GetMapping("/trang-thai-true")
    public ApiResponse<List<PhieuGiamGiaResponse>> trangThaiTrue()
    {
        List<PhieuGiamGiaResponse> listTrangThaiTrue = phieuGiamGiaService.getAllTrangThaiTrue();
        return ApiResponse.<List<PhieuGiamGiaResponse>>builder().result(listTrangThaiTrue).build();
    }
}
