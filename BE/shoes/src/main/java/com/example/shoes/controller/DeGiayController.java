package com.example.shoes.controller;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.degiay.request.DeGiayRequet;
import com.example.shoes.dto.degiay.response.DeGiayResponse;
import com.example.shoes.entity.DeGiay;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.DeGiayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
}
