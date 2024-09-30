package com.example.shoes.service.impl;


import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
import com.example.shoes.entity.KichThuoc;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.KichThuocRepo;
import com.example.shoes.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KichThuocServiceImpl implements KichThuocService {
    @Autowired
    private KichThuocRepo kichThuocRepo;
    @Override
    public List<KichThuocResponse> findAll() {
        List<KichThuoc> kichThuocList = kichThuocRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return kichThuocList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public KichThuocResponse getById(Integer id) {
        KichThuoc kichThuoc=kichThuocRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));
        return convertToResponse(kichThuoc);
    }

    @Override
    public KichThuocResponse create(KichThuocRequest request) {
        KichThuoc kichThuoc = new KichThuoc();
        kichThuoc.setKichThuoc(request.getKichThuoc());
        kichThuoc.setTrangThai(request.getTrangThai());
        KichThuoc saved = kichThuocRepo.save(kichThuoc);
        return convertToResponse(saved);
    }

    @Override
    public KichThuocResponse update(Integer id, KichThuocRequest request) {
        KichThuoc kichThuoc = kichThuocRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));
        kichThuoc.setKichThuoc(request.getKichThuoc());
        kichThuoc.setTrangThai(request.getTrangThai());
        KichThuoc updated = kichThuocRepo.save(kichThuoc);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!kichThuocRepo.existsById(id)) {
            throw new AppException(ErrorCode.MATERIAL_NOT_FOUND);
        }
        kichThuocRepo.deleteById(id);
    }
    private KichThuocResponse convertToResponse(KichThuoc kichThuoc) {
        KichThuocResponse kichThuocResponse = new  KichThuocResponse();
        kichThuocResponse.setId(kichThuoc.getId());
        kichThuocResponse.setKichThuoc(kichThuoc.getKichThuoc());
        kichThuocResponse.setTrangThai(kichThuoc.getTrangThai());
        return kichThuocResponse;
    }
}
