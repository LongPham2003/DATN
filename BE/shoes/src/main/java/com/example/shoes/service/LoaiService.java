package com.example.shoes.service;



import com.example.shoes.dto.loai.request.LoaiRequest;
import com.example.shoes.dto.loai.response.LoaiResponse;

import java.util.List;

public interface LoaiService {
    List<LoaiResponse> findAll();
    LoaiResponse getById(Integer id);
    LoaiResponse create(LoaiRequest request);
    LoaiResponse update(Integer id, LoaiRequest request);
    void delete(Integer id);
}
