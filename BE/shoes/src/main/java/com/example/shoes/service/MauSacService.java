package com.example.shoes.service;



import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;

import java.util.List;

public interface MauSacService {
    List<MauSacResponse> findAll();
    MauSacResponse getById(Integer id);
    MauSacResponse create(MauSacRequest request);
    MauSacResponse update(Integer id, MauSacRequest request);
    void delete(Integer id);
}
