package com.example.shoes.controller;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.thuonghieu.request.ThuongHieuRequest;
import com.example.shoes.dto.thuonghieu.response.ThuongHieuResponse;
import com.example.shoes.entity.ThuongHieu;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.ThuongHieuService;
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
    public ApiResponse<ThuongHieuResponse> create(@Valid  @RequestBody ThuongHieuRequest request, BindingResult  result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getFieldError().getDefaultMessage());
        }
        ThuongHieuResponse thuongHieuResponses = thuongHieuService.create(request);
        return ApiResponse.<ThuongHieuResponse>builder()
                .result(thuongHieuResponses)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<ThuongHieuResponse> update(@Valid @PathVariable Integer id, @RequestBody ThuongHieuRequest request,BindingResult result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getFieldError().getDefaultMessage());
        }
        ThuongHieuResponse updated = thuongHieuService.update(id, request);
        return ApiResponse.<ThuongHieuResponse>builder()
                .result(updated)
                .build();
    }

    @PutMapping("/updatetrangthai/{id}")
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
    @GetMapping("/getall")
    public ApiResponse<List<ThuongHieuResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<ThuongHieuResponse> list = thuongHieuService.getAll();

        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<ThuongHieuResponse>>builder()
                .result(list)
                .build();
    }

    @GetMapping("/ten")
    public ResponseEntity<List<String>> getAllTen(){
        List<String> listTen = thuongHieuService.getAllTenThuongHieu();
        return ResponseEntity.ok(listTen);
    }

}
