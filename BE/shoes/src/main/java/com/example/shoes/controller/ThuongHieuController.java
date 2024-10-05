package com.example.shoes.controller;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.thuonghieu.request.ThuongHieuRequest;
import com.example.shoes.dto.thuonghieu.response.ThuongHieuResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.ThuongHieu;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.ThuongHieuService;
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
@RequestMapping("/api/thuonghieu")
public class ThuongHieuController {
    @Autowired
    private ThuongHieuService thuongHieuService;
    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<ThuongHieu>> getAllThuongHieu(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<ThuongHieu> thuongHieuResponse = thuongHieuService.getThuongHieu(pageNumber, pageSize, keyword);
        return ApiResponse.<PhanTrangResponse<ThuongHieu>>builder()
                .result(thuongHieuResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ThuongHieuResponse> getById(@PathVariable Integer id) {
        ThuongHieuResponse thuongHieuResponses = thuongHieuService.getById(id);
        return ApiResponse.<ThuongHieuResponse>builder()
                .result(thuongHieuResponses)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<ThuongHieuResponse> create(@RequestBody ThuongHieuRequest request) {
        ThuongHieuResponse thuongHieuResponses = thuongHieuService.create(request);
        return ApiResponse.<ThuongHieuResponse>builder()
                .result(thuongHieuResponses)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<ThuongHieuResponse> update(@PathVariable Integer id, @RequestBody ThuongHieuRequest request) {
        ThuongHieuResponse updated = thuongHieuService.update(id, request);
        return ApiResponse.<ThuongHieuResponse>builder()
                .result(updated)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        thuongHieuService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
    @GetMapping("/search")
    public ApiResponse<List<ThuongHieuResponse>> search(
            @RequestParam(value = "ten", required = false) String ten,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai) {
        List<ThuongHieuResponse> thuongHieuResponses = thuongHieuService.search(ten,trangThai);
        return ApiResponse.<List<ThuongHieuResponse>>builder()
                .result(thuongHieuResponses)
                .build();
    }

}
