package com.example.shoes.controller;


import com.example.shoes.dto.loai.request.LoaiRequest;
import com.example.shoes.dto.loai.response.LoaiResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.LoaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/loai")
public class LoaiController {
    @Autowired
    private LoaiService loaiService;
    @GetMapping("/list")
    public ApiResponse<List<LoaiResponse>> getAll() {
        List<LoaiResponse> loaiResponses = loaiService.findAll();
        return ApiResponse.<List<LoaiResponse>>builder()
                .result(loaiResponses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<LoaiResponse> getById(@PathVariable Integer id) {
        LoaiResponse loaiResponses = loaiService.getById(id);
        return ApiResponse.<LoaiResponse>builder()
                .result(loaiResponses)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<LoaiResponse> create(@RequestBody LoaiRequest request) {
        LoaiResponse loaiResponses = loaiService.create(request);
        return ApiResponse.<LoaiResponse>builder()
                .result(loaiResponses)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<LoaiResponse> update(@PathVariable Integer id, @RequestBody LoaiRequest request) {
        LoaiResponse updated = loaiService.update(id, request);
        return ApiResponse.<LoaiResponse>builder()
                .result(updated)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        loaiService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
    @GetMapping("/search")
    public ApiResponse<List<LoaiResponse>> search(
            @RequestParam(value = "ten", required = false) String ten,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai) {
        List<LoaiResponse> loaiResponses = loaiService.search(ten, trangThai);
        return ApiResponse.<List<LoaiResponse>>builder()
                .result(loaiResponses)
                .build();
    }
}
