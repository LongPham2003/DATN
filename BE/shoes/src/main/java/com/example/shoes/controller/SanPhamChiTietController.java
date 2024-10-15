package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/sanphamchitiet")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;
    @GetMapping("/list")
   public ApiResponse<PhanTrangResponse<SanPhamChiTietResponse>> getAllChatLieu(
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<SanPhamChiTietResponse> sanPhamPhanTrangResponse = sanPhamChiTietService.getSanPhamChiTiet(pageNumber, pageSize);
        return ApiResponse.<PhanTrangResponse<SanPhamChiTietResponse>>builder()
                .result(sanPhamPhanTrangResponse)
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<SanPhamChiTietResponse> getById(@PathVariable Integer id) {
        SanPhamChiTietResponse sanPhamChiTietResponse = sanPhamChiTietService.getById(id);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(sanPhamChiTietResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<SanPhamChiTietResponse> create(@RequestBody SanPhamChiTietRequest request) {
        SanPhamChiTietResponse sanPhamChiTietResponse = sanPhamChiTietService.create(request);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(sanPhamChiTietResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SanPhamChiTietResponse> update(@PathVariable Integer id, @RequestBody SanPhamChiTietRequest request) {
        SanPhamChiTietResponse updated = sanPhamChiTietService.update(id, request);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(updated)
                .build();
    }
    @GetMapping("/loc")
    public ApiResponse<List<SanPhamChiTietResponse>> locSanPhamChiTiet(
            @RequestParam(required = false) Integer idSanPham,
            @RequestParam(required = false) Integer idMauSac,
            @RequestParam(required = false) Integer idkichThuoc,
            @RequestParam(required = false) Integer idChatLieu,
            @RequestParam(required = false) Integer idThuongHieu,
            @RequestParam(required = false) Integer idDeGiay,
            @RequestParam(required = false) Boolean trangThai,
            @RequestParam(required = false) BigDecimal minDonGia,
            @RequestParam(required = false) BigDecimal maxDonGia
    ) {
        // Gọi service để lọc sản phẩm chi tiết
        List<SanPhamChiTietResponse> responses = sanPhamChiTietService.locPhamChiTietList(
                idSanPham, idMauSac, idkichThuoc, idChatLieu, idThuongHieu, idDeGiay, trangThai, minDonGia, maxDonGia);

        // Trả về API response
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(responses)
                .build();
    }
    @GetMapping("/getall")
    public ApiResponse<List<SanPhamChiTietResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<SanPhamChiTietResponse> list = sanPhamChiTietService.getAll();

        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(list)
                .build();
    }
    @PutMapping ("/updatetrangthai/{id}")
    public ApiResponse<Void> updateTrangThai(@PathVariable Integer id) {
        sanPhamChiTietService.updateTheoTrangThai(id);
        return ApiResponse.<Void>builder()
                .message("Update thành công")
                .build();
    }
}
