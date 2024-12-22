package com.example.shoes.controller;

import com.example.shoes.dto.diachi.request.CreateDiaChiRequest;
import com.example.shoes.dto.diachi.request.UpdateDiaChiRequest;
import com.example.shoes.dto.diachi.response.DiaChiResponse;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.repository.DiaChiRepo;
import com.example.shoes.service.DiaChiService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/diachi")
public class DiaChiController {
    private final DiaChiService diaChiService;
    private  final DiaChiRepo diaChiRepo;

    @PostMapping("/add")
    public ApiResponse<DiaChiResponse> add(@RequestBody CreateDiaChiRequest request) {
        return ApiResponse.<DiaChiResponse>builder()
                .result(diaChiService.addDiaChi(request)).build();
    }

    @PostMapping("/addbyidkhachhang/{id}")
    public ApiResponse<DiaChi> addByIdKhachHang(@PathVariable("id") Integer id,@Valid @RequestBody CreateDiaChiRequest request,
            BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
        return ApiResponse.<DiaChi>builder()
                .result(diaChiService.addDiaChiByIdKhachHang(id,request)).build();
    }

    @PostMapping("/update")
    public ApiResponse<DiaChiResponse> update(@RequestBody UpdateDiaChiRequest request) {
        return ApiResponse.<DiaChiResponse>builder()
                .result(diaChiService.updateDiaChi(request)).build();
    }

    @GetMapping("/allbyidkhachhang")
    public ApiResponse<List<DiaChi>> getallDiaChiByKhachHang(@RequestParam("idKhachHang") Integer idKhachHang) {
        return ApiResponse.<List<DiaChi>>builder()
                .result(diaChiService.getALlByKhachHang(idKhachHang)).build();
    }

    @PutMapping("/setDefault/{idDiaChi}")
    public ApiResponse<DiaChi> setDefaultAddress(@PathVariable Integer idDiaChi, @RequestParam Integer idKhachHang) {
        DiaChi updatedDiaChi = diaChiService.updateDiaChiAllFasle(idDiaChi,idKhachHang);
        return ApiResponse.<DiaChi>builder()
                .result(updatedDiaChi).build();
    }

    @GetMapping("/diachimacdinh/{idkhachhang}")
    public ApiResponse<DiaChi> diachimacdinh(@PathVariable Integer idkhachhang) {
        DiaChi diaChi = diaChiRepo.getDiaChiByIdKhachHangAndDiaChiMacDinh(idkhachhang);
        return ApiResponse.<DiaChi>builder()
                .result(diaChi).build();
    }

}
