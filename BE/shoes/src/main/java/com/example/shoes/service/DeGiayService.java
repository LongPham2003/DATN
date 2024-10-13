package com.example.shoes.service;




import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.degiay.request.DeGiayRequet;
import com.example.shoes.dto.degiay.response.DeGiayResponse;

import com.example.shoes.entity.DeGiay;

import java.util.List;

public interface DeGiayService {
    PhanTrangResponse<DeGiay> getDeGiay(int pageNumber, int pageSize, String keyword);
    DeGiayResponse getById(Integer id);
    DeGiayResponse create(DeGiayRequet request);
    DeGiayResponse update(Integer id, DeGiayRequet request);
    void delete(Integer id);
    List<DeGiayResponse> search(String ten, Boolean trangThai);
    List<DeGiayResponse> getAll();
}
