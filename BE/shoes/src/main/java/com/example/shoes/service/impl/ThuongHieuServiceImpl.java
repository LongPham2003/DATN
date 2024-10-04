package com.example.shoes.service.impl;


import com.example.shoes.dto.thuonghieu.request.ThuongHieuRequest;
import com.example.shoes.dto.thuonghieu.response.ThuongHieuResponse;
import com.example.shoes.entity.ThuongHieu;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.ThuongHieuRepo;
import com.example.shoes.service.ThuongHieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThuongHieuServiceImpl implements ThuongHieuService {
    @Autowired
    private ThuongHieuRepo thuongHieuRepo;

    @Override
    public List<ThuongHieuResponse> findAll() {
        List<ThuongHieu> list =thuongHieuRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ThuongHieuResponse getById(Integer id) {
        ThuongHieu thuongHieu=thuongHieuRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        return convertToResponse(thuongHieu);
    }

    @Override
    public ThuongHieuResponse create(ThuongHieuRequest request) {
        ThuongHieu thuongHieu = new ThuongHieu();
        thuongHieu.setTen(request.getTen());
        thuongHieu.setTrangThai(request.getTrangThai());
        ThuongHieu saved = thuongHieuRepo.save(thuongHieu);
        return convertToResponse(saved);
    }

    @Override
    public ThuongHieuResponse update(Integer id, ThuongHieuRequest request) {
        ThuongHieu thuongHieu=thuongHieuRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        thuongHieu.setTen(request.getTen());
        thuongHieu.setTrangThai(request.getTrangThai());
        ThuongHieu updated =thuongHieuRepo.save(thuongHieu);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!thuongHieuRepo.existsById(id)) {
            throw new AppException(ErrorCode.BRAND_NOT_FOUND);
        }
        thuongHieuRepo.deleteById(id);
    }

    @Override
    public List<ThuongHieuResponse> search(String ten, Boolean trangThai) {
        List<ThuongHieu> thuongHieuList;

        if (ten != null && trangThai != null) {
            thuongHieuList = thuongHieuRepo.findByTenContainingIgnoreCaseAndTrangThai(ten, trangThai);
        } else if (ten != null) {
            thuongHieuList = thuongHieuRepo.findByTenContainingIgnoreCase(ten);
        } else if (trangThai != null) {
            thuongHieuList = thuongHieuRepo.findByTrangThai(trangThai);
        } else {
            thuongHieuList = thuongHieuRepo.findAll();
        }

        return thuongHieuList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    private ThuongHieuResponse convertToResponse(ThuongHieu thuongHieu) {
        ThuongHieuResponse thuongHieuResponse = new ThuongHieuResponse();
        thuongHieuResponse.setId(thuongHieu.getId());
        thuongHieuResponse.setTen(thuongHieu.getTen());
        thuongHieuResponse.setTrangThai(thuongHieu.getTrangThai());
        return thuongHieuResponse;
    }
}
