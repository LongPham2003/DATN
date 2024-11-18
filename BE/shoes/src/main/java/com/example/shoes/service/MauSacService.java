package com.example.shoes.service;
import com.example.shoes.dto.PhanTrangResponse;

import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;
import com.example.shoes.entity.MauSac;
import java.util.List;

public interface MauSacService {
    PhanTrangResponse<MauSac> getMauSac(int pageNumber, int pageSize, String keyword);
    MauSacResponse getById(Integer id);
    MauSacResponse create(MauSacRequest request);
    MauSacResponse update(Integer id, MauSacRequest request);
    void delete(Integer id);
    List<MauSacResponse> search(String ten, Boolean trangThai);
    List<String> getAllTenMauSac();
    List<MauSacResponse> getAll();
    List<MauSacResponse>getMauSacByidSP(Integer idSanPham);
}
