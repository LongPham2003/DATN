package com.example.shoes.service;

import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;

import java.util.List;


public interface PhieuGiamGiaService {
    List<PhieuGiamGiaResponse> findAll();
    PhieuGiamGiaResponse getById(Integer id);
    PhieuGiamGiaResponse create(PhieuGiamGiaRequest request);
    PhieuGiamGiaResponse update(Integer id, PhieuGiamGiaRequest request);
    void delete(Integer id);
}
