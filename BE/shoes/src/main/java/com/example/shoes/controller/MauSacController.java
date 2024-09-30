package com.example.shoes.controller;

import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mausac")
public class MauSacController {
    @Autowired
    private MauSacService mausacService;
    @GetMapping("/list")
    public ApiResponse<List<MauSacResponse>> getAll() {
        List<MauSacResponse> mauSacResponses = mausacService.findAll();
        return ApiResponse.<List<MauSacResponse>>builder()
                .result(mauSacResponses)
                .build();
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
