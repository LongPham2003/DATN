package com.example.shoes.controller;

import com.example.shoes.dto.hoadon.request.HoaDonRequest;
import com.example.shoes.dto.hoadon.response.HoaDonResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/taiquay")
public class BanHangTaiQuayController {
    @Autowired
    private HoaDonService hoaDonService;

    @PostMapping("/taodon")
    public ApiResponse<HoaDonResponse> createHoaDon(@RequestBody HoaDonRequest hoaDonRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.createHoaDon(hoaDonRequest);
        return ApiResponse.<HoaDonResponse>builder()
                .result(hoaDonResponse)
                .build();
    }
}
