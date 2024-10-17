package com.example.shoes.controller;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.dto.phuongthucthanhtoan.request.PhuongThucThanhToanRequest;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/taiquay")
public class BanHangTaiQuayController {
    @Autowired
    private HoaDonService hoaDonService;
// tạo hóa đon moi
    @PostMapping("/taodon")
    public ApiResponse<HoaDonResponse> createHoaDon(@RequestBody HoaDonRequest hoaDonRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.createHoaDon(hoaDonRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }
    @PostMapping("/thanhtoan/{idhoadon}")
    public ResponseEntity<ApiResponse<String>> thanhToan(
            @PathVariable("idhoadon") Integer idhoadon,
            @RequestBody  PhuongThucThanhToanRequest phuongThucThanhToanRequest) {

        try {
            // Gọi service thanh toán hóa đơn
            hoaDonService.thanhToan(idhoadon, phuongThucThanhToanRequest);

            // Trả về phản hồi thành công
            ApiResponse<String> response = ApiResponse.<String>builder()
                    .message("Hóa đơn đã được thanh toán thành công.")
                    .build();
            return ResponseEntity.ok(response); // 200 OK
        } catch (Exception e) {
            // Xử lý lỗi chung
            ApiResponse<String> response = ApiResponse.<String>builder()
                    .message("Có lỗi xảy ra trong quá trình thanh toán.")
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }

}
