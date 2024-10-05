package com.example.shoes.service;




import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.loai.request.LoaiRequest;
import com.example.shoes.dto.loai.response.LoaiResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.Loai;

import java.util.List;

public interface LoaiService {
    PhanTrangResponse<Loai> getLoai(int pageNumber, int pageSize, String keyword);
    LoaiResponse getById(Integer id);
    LoaiResponse create(LoaiRequest request);
    LoaiResponse update(Integer id, LoaiRequest request);
    void delete(Integer id);
    List<LoaiResponse> search(String ten, Boolean trangThai);
}
