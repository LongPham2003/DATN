package com.example.shoes.service.impl;


import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.entity.SanPham;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.SanPhamRepo;
import com.example.shoes.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class SanPhamServiceImpl implements SanPhamService {
    @Autowired
    private SanPhamRepo sanPhamRepo;

    private SanPhamResponse convertToSanPhamResponse(SanPham sanPham) {
        SanPhamResponse sanPhamResponse = new SanPhamResponse();
        sanPhamResponse.setId(sanPham.getId());
        sanPhamResponse.setIdLoai(sanPham.getIdLoai().getId());
        sanPhamResponse.setTenSanPham(sanPham.getTenSanPham());
        sanPhamResponse.setNgayTao(sanPham.getNgayTao());
        sanPhamResponse.setMoTa(sanPham.getMoTa());
        sanPhamResponse.setTrangThai(sanPham.getTrangThai());
        return sanPhamResponse;
    }


    @Override
    public List<SanPhamResponse> findAll() {
        List<SanPham> list = sanPhamRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return list.stream()
                .map(this::convertToSanPhamResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SanPhamResponse getById(Integer id) {
        SanPham sanPham = sanPhamRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return convertToSanPhamResponse(sanPham);
    }

    @Override
    public SanPhamResponse create(SanPhamRequest request) {
        SanPham sanPham = new SanPham();
        sanPham.setIdLoai(sanPham.getIdLoai());
        sanPham.setTenSanPham(request.getTenSanPham());
        sanPham.setNgayTao(request.getNgayTao());
        sanPham.setMoTa(request.getMoTa());
        sanPham.setTrangThai(request.getTrangThai());
        SanPham saved = sanPhamRepo.save(sanPham);
        return convertToSanPhamResponse(saved);
    }

    @Override
    public SanPhamResponse update(Integer id, SanPhamRequest request) {
        SanPham sanPham = sanPhamRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        sanPham.setIdLoai(sanPham.getIdLoai());
        sanPham.setTenSanPham(request.getTenSanPham());
        sanPham.setNgayTao(request.getNgayTao());
        sanPham.setMoTa(request.getMoTa());
        sanPham.setTrangThai(request.getTrangThai());
        SanPham saved = sanPhamRepo.save(sanPham);
        return convertToSanPhamResponse(saved);
    }
}
