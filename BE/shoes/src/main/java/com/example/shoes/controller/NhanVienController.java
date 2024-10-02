package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.nhanvien.request.NhanVienUpdateRequest;
import com.example.shoes.dto.nhanvien.request.NhanvienAddRequest;
import com.example.shoes.entity.NhanVien;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/nhanvien")
@RequiredArgsConstructor
public class NhanVienController {
    private final NhanVienService nhanVienService;

    @GetMapping("/search")
    public ApiResponse<PhanTrangResponse<NhanVien>> search(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {

        PhanTrangResponse<NhanVien> list = nhanVienService.getNhanVien(pageNumber, pageSize, keyword);

        return ApiResponse.<PhanTrangResponse<NhanVien>>builder()
                .result(list).build();
    }

    @PostMapping("/add")
    public ApiResponse<NhanVien> add(@RequestBody NhanvienAddRequest nhanvienAddRequest) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.addNhanVien(nhanvienAddRequest)).build();
    }

    @PostMapping("/update/{id}")
    public ApiResponse<NhanVien> update(@PathVariable("id") Integer id, @RequestBody NhanVienUpdateRequest request) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.updateNhanVien(id, request)).build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<NhanVien> delete(@PathVariable("id") Integer id) {
        return ApiResponse.<NhanVien>builder()
                .result(nhanVienService.deleteNhanVien(id)).build();
    }
}
