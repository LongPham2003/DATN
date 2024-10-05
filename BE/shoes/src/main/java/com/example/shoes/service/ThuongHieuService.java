package com.example.shoes.service;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.thuonghieu.request.ThuongHieuRequest;
import com.example.shoes.dto.thuonghieu.response.ThuongHieuResponse;

import com.example.shoes.entity.ThuongHieu;

import java.util.List;

public interface ThuongHieuService {
    PhanTrangResponse<ThuongHieu> getThuongHieu(int pageNumber, int pageSize, String keyword);
    ThuongHieuResponse getById(Integer id);
    ThuongHieuResponse create(ThuongHieuRequest request);
    ThuongHieuResponse update(Integer id,ThuongHieuRequest request);
    void delete(Integer id);
    List<ThuongHieuResponse> search(String ten, Boolean trangThai);
}
