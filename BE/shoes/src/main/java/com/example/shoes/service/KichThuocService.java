package com.example.shoes.service;




import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;

import com.example.shoes.entity.KichThuoc;


import java.util.List;

public interface KichThuocService {
    PhanTrangResponse<KichThuoc> getKichThuoc(int pageNumber, int pageSize, String keyword);
    KichThuocResponse getById(Integer id);
    KichThuocResponse create(KichThuocRequest request);
    KichThuocResponse update(Integer id, KichThuocRequest request);
    void delete(Integer id);
    List<KichThuocResponse> search(String kichThuoc, Boolean trangThai);
    List<String> getAllTenKichThuoc();

    List<KichThuocResponse> getAll();
}
