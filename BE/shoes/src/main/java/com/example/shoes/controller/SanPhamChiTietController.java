package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamChiTietService;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // Fake data
//    @PostMapping("/fakeData")
    private ResponseEntity<String> generateFakeProducts() {
        Faker faker = new Faker();
        for (int i = 0; i < 500; i++) {
            SanPhamChiTietRequest SPCT = SanPhamChiTietRequest.builder()
                    .idSanPham(faker.number().numberBetween(1, 10))
                    .idChatLieu(faker.number().numberBetween(1, 10))
                    .idMauSac(faker.number().numberBetween(1, 10))
                    .idKichThuoc(faker.number().numberBetween(1, 10))
                    .idThuongHieu(faker.number().numberBetween(1, 10))
                    .idDeGiay(faker.number().numberBetween(1, 10))

                    .donGia(BigDecimal.valueOf(faker.number().numberBetween(300000, 2000000)))
                    .soLuong(faker.number().numberBetween(20, 200))
                    .trangThai(true)
                    .build();
            try {
                sanPhamChiTietService.create(SPCT);
            } catch (Exception e) {
                // Ghi log lỗi nhưng không return
                System.err.println("Failed to create product detail: " + e.getMessage());
                continue; // Tiếp tục tạo các sản phẩm khác
            }
        }
        return ResponseEntity.ok("Fake Products created successfully");

    }
}
