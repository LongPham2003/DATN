package com.example.shoes.service.impl;


import com.example.shoes.dto.loai.request.LoaiRequest;
import com.example.shoes.dto.loai.response.LoaiResponse;
import com.example.shoes.entity.Loai;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.LoaiRepo;
import com.example.shoes.service.LoaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoaiServiceImpl implements LoaiService {
    @Autowired
    private LoaiRepo loaiRepository;
    @Override
    public List<LoaiResponse> findAll() {
        List<Loai> list =loaiRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LoaiResponse getById(Integer id) {
      Loai loai=loaiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        return convertToResponse(loai);
    }

    @Override
    public LoaiResponse create(LoaiRequest request) {
        Loai loai = new Loai();
        loai.setTen(request.getTen());
        loai.setTrangThai(request.getTrangThai());
        Loai saved = loaiRepository.save(loai);
        return convertToResponse(saved);
    }

    @Override
    public LoaiResponse update(Integer id, LoaiRequest request) {
        Loai loai=loaiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        loai.setTen(request.getTen());
        loai.setTrangThai(request.getTrangThai());
        Loai updated =loaiRepository.save(loai);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!loaiRepository.existsById(id)) {
            throw new AppException(ErrorCode.MATERIAL_NOT_FOUND);
        }
        loaiRepository.deleteById(id);
    }
    private LoaiResponse convertToResponse(Loai loai) {
        LoaiResponse loaiResponse = new  LoaiResponse();
        loaiResponse.setId(loai.getId());
        loaiResponse.setTen(loai.getTen());
        loaiResponse.setTrangThai(loai.getTrangThai());
        return loaiResponse;
    }
}
