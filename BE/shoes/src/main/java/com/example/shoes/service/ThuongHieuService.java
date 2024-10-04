package com.example.shoes.service;


import com.example.shoes.dto.thuonghieu.request.ThuongHieuRequest;
import com.example.shoes.dto.thuonghieu.response.ThuongHieuResponse;

import java.util.List;

public interface ThuongHieuService {
    List<ThuongHieuResponse> findAll();
    ThuongHieuResponse getById(Integer id);
    ThuongHieuResponse create(ThuongHieuRequest request);
    ThuongHieuResponse update(Integer id,ThuongHieuRequest request);
    void delete(Integer id);
    List<ThuongHieuResponse> search(String ten, Boolean trangThai);
}
