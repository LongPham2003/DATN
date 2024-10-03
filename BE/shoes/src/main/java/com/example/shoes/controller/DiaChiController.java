package com.example.shoes.controller;

import com.example.shoes.dto.diachi.request.CreateDiaChiRequest;
import com.example.shoes.dto.diachi.request.UpdateDiaChiRequest;
import com.example.shoes.dto.diachi.response.DiaChiResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.DiaChiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/diachi")
public class DiaChiController {
    private final DiaChiService diaChiService;

    @PostMapping("/add")
    public ApiResponse<DiaChiResponse> add(@RequestBody CreateDiaChiRequest request) {
        return ApiResponse.<DiaChiResponse>builder()
                .result(diaChiService.addDiaChi(request)).build();
    }
    @PostMapping("/update")
    public ApiResponse<DiaChiResponse> update(@RequestBody UpdateDiaChiRequest request) {
        return ApiResponse.<DiaChiResponse>builder()
                .result(diaChiService.updateDiaChi(request)).build();
    }

}
