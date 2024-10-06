package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;
import com.example.shoes.entity.MauSac;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/mausac")
public class MauSacController {
    @Autowired
    private MauSacService mausacService;
    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<MauSac>> getAllChatLieu(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<MauSac> mauSac = mausacService.getMauSac(pageNumber, pageSize, keyword);
        return ApiResponse.<PhanTrangResponse<MauSac>>builder()
                .result(mauSac)
                .build();
    }

    @GetMapping("/ten")
    public ResponseEntity<List<String>> getAllTen(){
        List<String> listTen = mausacService.getAllTenMauSac();
        return ResponseEntity.ok(listTen);
    }

    @GetMapping("/{id}")
    public ApiResponse<MauSacResponse> getById(@PathVariable Integer id) {
        MauSacResponse mauSacResponses = mausacService.getById(id);
        return ApiResponse.<MauSacResponse>builder()
                .result(mauSacResponses)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<MauSacResponse> create(@RequestBody MauSacRequest request) {
        MauSacResponse mauSacResponses = mausacService.create(request);
        return ApiResponse.<MauSacResponse>builder()
                .result(mauSacResponses)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<MauSacResponse> update(@PathVariable Integer id, @RequestBody MauSacRequest request) {
        MauSacResponse updated = mausacService.update(id, request);
        return ApiResponse.<MauSacResponse>builder()
                .result(updated)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        mausacService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
}
