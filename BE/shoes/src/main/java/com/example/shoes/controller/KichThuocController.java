package com.example.shoes.controller;

import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.KichThuocService;
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
@RequestMapping("/api/kichthuoc")
public class KichThuocController {
    @Autowired
    private KichThuocService kichThuocService;
    @GetMapping("/list")
    public ApiResponse<List<KichThuocResponse>> getAll() {
        List<KichThuocResponse> kichThuocResponses = kichThuocService.findAll();
        return ApiResponse.<List<KichThuocResponse>>builder()
                .result(kichThuocResponses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<KichThuocResponse> getById(@PathVariable Integer id) {
        KichThuocResponse kichThuocResponse = kichThuocService.getById(id);
        return ApiResponse.<KichThuocResponse>builder()
                .result(kichThuocResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<KichThuocResponse> create(@RequestBody KichThuocRequest request) {
        KichThuocResponse kichThuocResponse = kichThuocService.create(request);
        return ApiResponse.<KichThuocResponse>builder()
                .result(kichThuocResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<KichThuocResponse> update(@PathVariable Integer id, @RequestBody KichThuocRequest request) {
        KichThuocResponse updated = kichThuocService.update(id, request);
        return ApiResponse.<KichThuocResponse>builder()
                .result(updated)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        kichThuocService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
    @GetMapping("/search")
    public ApiResponse<List<KichThuocResponse>> search(
            @RequestParam(value = "kichThuoc", required = false) String kichThuoc,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai) {
        List<KichThuocResponse> kichThuocResponses = kichThuocService.search(kichThuoc, trangThai);
        return ApiResponse.<List<KichThuocResponse>>builder()
                .result(kichThuocResponses)
                .build();
    }
}