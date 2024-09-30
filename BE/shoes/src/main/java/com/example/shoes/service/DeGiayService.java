package com.example.shoes.service;



import com.example.shoes.dto.degiay.request.DeGiayRequet;
import com.example.shoes.dto.degiay.response.DeGiayResponse;

import java.util.List;

public interface DeGiayService {
    List<DeGiayResponse> findAll();
    DeGiayResponse getById(Integer id);
    DeGiayResponse create(DeGiayRequet request);
    DeGiayResponse update(Integer id, DeGiayRequet request);
    void delete(Integer id);
}
