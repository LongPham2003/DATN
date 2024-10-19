package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;

import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
import com.example.shoes.entity.KichThuoc;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
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
    public ApiResponse<PhanTrangResponse<KichThuoc>> getAllChatLieu(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<KichThuoc> kichThuoc = kichThuocService.getKichThuoc(pageNumber, pageSize, keyword);
        return ApiResponse.<PhanTrangResponse<KichThuoc>>builder()
                .result(kichThuoc)
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

    @PutMapping("/updatetrangthai/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        kichThuocService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }

    @GetMapping("/ten")
    public ResponseEntity<List<String>> getAllTen(){
        List<String> listTen = kichThuocService.getAllTenKichThuoc();
        return ResponseEntity.ok(listTen);
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
    @GetMapping("/getall")
    public ApiResponse<List<KichThuocResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<KichThuocResponse> list = kichThuocService.getAll();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<KichThuocResponse>>builder()
                .result(list)
                .build();
    }
}
