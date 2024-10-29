package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;
import com.example.shoes.entity.PhieuGiamGia;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


public interface PhieuGiamGiaService {
    PhieuGiamGiaResponse getById(Integer id);
    PhieuGiamGiaResponse create(PhieuGiamGiaRequest request);
    PhieuGiamGiaResponse update(Integer id, PhieuGiamGiaRequest request);
    PhieuGiamGiaResponse delete(Integer id, PhieuGiamGiaRequest request);


    PhanTrangResponse<PhieuGiamGia> getPhieuGiamGia(int pageNumber, int pageSize, String keyword, String tenVoucher, Boolean trangThai, LocalDateTime ngayBatDau, LocalDateTime ngatKetThuc);
}
