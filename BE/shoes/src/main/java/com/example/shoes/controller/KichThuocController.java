package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
import com.example.shoes.entity.DeGiay;
import com.example.shoes.entity.KichThuoc;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        kichThuocService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
}
