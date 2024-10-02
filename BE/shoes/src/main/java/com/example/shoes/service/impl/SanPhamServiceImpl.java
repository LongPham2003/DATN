package com.example.shoes.service.impl;


import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;
import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.entity.MauSac;
import com.example.shoes.entity.SanPham;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.SanPhamRepo;
import com.example.shoes.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.stream.Collectors;

public class SanPhamServiceImpl implements SanPhamService {
   @Autowired
   private SanPhamRepo sanPhamRepo;
//    @Override
//    public List<SanPhamResponse> findAll() {
//        List<MauSac> list =mauSacRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
//        return list.stream()
//                .map(this::convertToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public MauSacResponse getById(Integer id) {
//        MauSac mauSac=mauSacRepo.findById(id)
//                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));
//        return convertToResponse(mauSac);
//    }
//
//    @Override
//    public MauSacResponse create(MauSacRequest request) {
//        MauSac mauSac = new MauSac();
//        mauSac.setTen(request.getTen());
//        mauSac.setTrangThai(request.getTrangThai());
//        MauSac saved = mauSacRepo.save(mauSac);
//        return convertToResponse(saved);
//    }
//
//    @Override
//    public MauSacResponse update(Integer id, MauSacRequest request) {
//        MauSac mauSac=mauSacRepo.findById(id)
//                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));
//        mauSac.setTen(request.getTen());
//        mauSac.setTrangThai(request.getTrangThai());
//        MauSac updated =mauSacRepo.save(mauSac);
//        return convertToResponse(updated);
//    }

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
        List<SanPham> list =sanPhamRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return list.stream()
                .map(this::convertToSanPhamResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SanPhamResponse getById(Integer id) {
        return null;
    }

    @Override
    public SanPhamResponse create(SanPhamRequest request) {
        return null;
    }

    @Override
    public SanPhamResponse update(Integer id, SanPhamRequest request) {
        return null;
    }
}
