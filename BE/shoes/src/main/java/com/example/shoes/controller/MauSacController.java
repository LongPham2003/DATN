package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;
import com.example.shoes.entity.MauSac;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.MauSacService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
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
    public ApiResponse<MauSacResponse> create(@Valid  @RequestBody MauSacRequest request , BindingResult result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getFieldError().getDefaultMessage());
        }
        MauSacResponse mauSacResponses = mausacService.create(request);
        return ApiResponse.<MauSacResponse>builder()
                .result(mauSacResponses)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<MauSacResponse> update(@Valid @PathVariable Integer id, @RequestBody MauSacRequest request , BindingResult result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getFieldError().getDefaultMessage());
        }
        MauSacResponse updated = mausacService.update(id, request);
        return ApiResponse.<MauSacResponse>builder()
                .result(updated)
                .build();
    }

    @PutMapping("/updatetrangthai/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        mausacService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
    @GetMapping("/search")
    public ApiResponse<List<MauSacResponse>> search(
            @RequestParam(value = "ten", required = false) String ten,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai) {
        List<MauSacResponse> mauSacResponses = mausacService.search(ten,trangThai);
        return ApiResponse.<List<MauSacResponse>>builder()
                .result(mauSacResponses)
                .build();
    }
    @GetMapping("/getall")
    public ApiResponse<List<MauSacResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<MauSacResponse> list = mausacService.getAll();

        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<MauSacResponse>>builder()
                .result(list)
                .build();
    }
    @GetMapping("/mausactheoidsp/{idsp}")
    public ApiResponse<List<MauSacResponse>> getMauSacByidSP(@PathVariable("idsp") Integer idSanPham) {
        // Gọi hàm getKichThuocByidSP() để lấy danh sách KichThuocResponse
        List<MauSacResponse> list = mausacService.getMauSacByidSP(idSanPham);
        // Tạo đối tượng ApiResponse để trả về danh sách KichThuocResponse
        return ApiResponse.<List<MauSacResponse>>builder()
                .result(list)
                .build();
    }

}
