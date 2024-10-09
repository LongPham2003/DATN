package com.example.shoes.controller;



import com.example.shoes.dto.PhanTrangResponse;

import com.example.shoes.dto.degiay.request.DeGiayRequet;
import com.example.shoes.dto.degiay.response.DeGiayResponse;
import com.example.shoes.entity.DeGiay;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.DeGiayService;
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
@RequestMapping("/api/degiay")
public class DeGiayController {
    @Autowired
    private DeGiayService deGiayService;
    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<DeGiay>> getAllChatLieu(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<DeGiay> deGiay = deGiayService.getDeGiay(pageNumber, pageSize, keyword);
        return ApiResponse.<PhanTrangResponse<DeGiay>>builder()
                .result(deGiay)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<DeGiayResponse> getById(@PathVariable Integer id) {
        DeGiayResponse deGiayResponse = deGiayService.getById(id);
        return ApiResponse.<DeGiayResponse>builder()
                .result(deGiayResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<DeGiayResponse> create(@RequestBody DeGiayRequet request) {
        DeGiayResponse deGiayResponse = deGiayService.create(request);
        return ApiResponse.<DeGiayResponse>builder()
                .result(deGiayResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<DeGiayResponse> update(@PathVariable Integer id, @RequestBody DeGiayRequet request) {
        DeGiayResponse updatedDeGiay = deGiayService.update(id, request);
        return ApiResponse.<DeGiayResponse>builder()
                .result(updatedDeGiay)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
       deGiayService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
    @GetMapping("/search")
    public ApiResponse<List<DeGiayResponse>> search(
            @RequestParam(value = "ten", required = false) String ten,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai) {
        List<DeGiayResponse> deGiayResponses = deGiayService.search(ten, trangThai);
        return ApiResponse.<List<DeGiayResponse>>builder()
                .result(deGiayResponses)
                .build();
    }
    @GetMapping("/getall")
    public ApiResponse<List<DeGiayResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<DeGiayResponse> list = deGiayService.getAll();
        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<DeGiayResponse>>builder()
                .result(list)
                .build();
    }
}
