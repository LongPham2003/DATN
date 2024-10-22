package com.example.shoes.controller;

import com.example.shoes.dto.hinhanh.repuest.HinhAnhRequest;
import com.example.shoes.dto.hinhanh.response.HinhAnhResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HinhAnhService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hinhanh")
@CrossOrigin("*")
public class HinhAnhController {
    @Autowired
    private HinhAnhService hinhAnhService;
    @GetMapping("/list")
    public ApiResponse<List<HinhAnhResponse>> getAll() {
        List<HinhAnhResponse> hinhAnhResponses = hinhAnhService.findAll();
        return ApiResponse.<List<HinhAnhResponse>>builder()
                .result(hinhAnhResponses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<HinhAnhResponse> getById(@PathVariable Integer id) {
        HinhAnhResponse hinhAnhResponse =hinhAnhService.getById(id);
        return ApiResponse.<HinhAnhResponse>builder()
                .result(hinhAnhResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<HinhAnhResponse> create(@RequestBody HinhAnhRequest request) {
        HinhAnhResponse hinhAnhResponse= hinhAnhService.create(request);
        return ApiResponse.<HinhAnhResponse>builder()
                .result(hinhAnhResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<HinhAnhResponse> update(@PathVariable Integer id, @RequestBody HinhAnhRequest request) {
        HinhAnhResponse updated = hinhAnhService.update(id, request);
        return ApiResponse.<HinhAnhResponse>builder()
                .result(updated)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        hinhAnhService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa thành công")
                .build();
    }
    // API lấy ảnh đại diện cho SanPhamChiTiet
    @GetMapping("/dai-dien/{idSanPhamChiTiet}")
    public ApiResponse<HinhAnhResponse> getHinhAnhDaiDien(@PathVariable Integer idSanPhamChiTiet) {
        HinhAnhResponse hinhAnhResponse = hinhAnhService.getFirstBySanPhamChiTietId(idSanPhamChiTiet);
        return ApiResponse.<HinhAnhResponse>builder()
                .result(hinhAnhResponse)
                .build();
    }
    @GetMapping("/tatcathinhanh/{idSanPhamChiTiet}")
    public ApiResponse<List<HinhAnhResponse>> getAllHinhAnhTheoIDSPCT(@PathVariable Integer idSanPhamChiTiet) {
        List<HinhAnhResponse> hinhAnhResponses = hinhAnhService.getAllHinhAnhTheoIDSPCT(idSanPhamChiTiet);
        return ApiResponse.<List<HinhAnhResponse>>builder()
                .result(hinhAnhResponses)
                .build();
    }
}
