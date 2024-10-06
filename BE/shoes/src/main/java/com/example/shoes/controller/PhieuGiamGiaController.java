package com.example.shoes.controller;

import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phieugiamgia")
public class PhieuGiamGiaController {
    @Autowired
    private PhieuGiamGiaService phieuGiamGiaService;

    @GetMapping("/list")
    public ApiResponse<List<PhieuGiamGiaResponse>> getAll() {
        List<PhieuGiamGiaResponse> phieuGiamGiaResponses = phieuGiamGiaService.findAll();
        return ApiResponse.<List<PhieuGiamGiaResponse>>builder()
                .result(phieuGiamGiaResponses)
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

//    @DeleteMapping("/delete/{id}")
//    public ApiResponse<Void> delete(@PathVariable Integer id) {
//        phieuGiamGiaService.delete(id);
//        return ApiResponse.<Void>builder()
//                .message("Xóa thành công")
//                .build();
//    }
    @PutMapping("/delete/{id}")
    public ApiResponse<PhieuGiamGiaResponse> delete(@PathVariable Integer id, @RequestBody PhieuGiamGiaRequest request) {
        PhieuGiamGiaResponse updated = phieuGiamGiaService.delete(id, request);
        return ApiResponse.<PhieuGiamGiaResponse>builder()
                .result(updated)
                .build();
    }


}
