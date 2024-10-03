package com.example.shoes.service.impl;


import com.example.shoes.dto.phieugiamgia.request.PhieuGiamGiaRequest;
import com.example.shoes.dto.phieugiamgia.response.PhieuGiamGiaResponse;

import com.example.shoes.repository.PhieuGiamGiaRepo;
import com.example.shoes.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.shoes.entity.PhieuGiamGia;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import org.springframework.data.domain.Sort;


import java.util.List;
import java.util.stream.Collectors;
@Service
public class PhieuGiamGiaServiceImpl implements PhieuGiamGiaService {

    @Autowired
    private PhieuGiamGiaRepo phieuGiamGiaRepo;

    @Override
    public List<PhieuGiamGiaResponse> findAll() {
        List<PhieuGiamGia> list = phieuGiamGiaRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PhieuGiamGiaResponse getById(Integer id) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        return convertToResponse(phieuGiamGia);
    }

    @Override
    public PhieuGiamGiaResponse create(PhieuGiamGiaRequest request) {
        PhieuGiamGia phieuGiamGia = new PhieuGiamGia();
        phieuGiamGia.setTenVoucher(request.getTenVoucher());
        phieuGiamGia.setDieuKienGiamGia(request.getDieuKienGiamGia());
        phieuGiamGia.setMucGiam(request.getMucGiam());
        phieuGiamGia.setGiamToiDa(request.getGiamToiDa());
        phieuGiamGia.setSoLuong(request.getSoLuong());
        phieuGiamGia.setNgayBatDau(request.getNgayBatDau());
        phieuGiamGia.setNgayKetThuc(request.getNgayKetThuc());
        phieuGiamGia.setTrangThai(request.getTrangThai());
        PhieuGiamGia saved = phieuGiamGiaRepo.save(phieuGiamGia);
        return convertToResponse(saved);
    }

    @Override
    public PhieuGiamGiaResponse update(Integer id, PhieuGiamGiaRequest request) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        phieuGiamGia.setTenVoucher(request.getTenVoucher());
        phieuGiamGia.setDieuKienGiamGia(request.getDieuKienGiamGia());
        phieuGiamGia.setMucGiam(request.getMucGiam());
        phieuGiamGia.setGiamToiDa(request.getGiamToiDa());
        phieuGiamGia.setSoLuong(request.getSoLuong());
        phieuGiamGia.setNgayBatDau(request.getNgayBatDau());
        phieuGiamGia.setNgayKetThuc(request.getNgayKetThuc());
        phieuGiamGia.setTrangThai(request.getTrangThai());
        PhieuGiamGia updated = phieuGiamGiaRepo.save(phieuGiamGia);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!phieuGiamGiaRepo.existsById(id)) {
            throw new AppException(ErrorCode.VOUCHER_NOT_FOUND);
        }
        phieuGiamGiaRepo.deleteById(id);
    }

    private PhieuGiamGiaResponse convertToResponse(PhieuGiamGia phieuGiamGia) {
        PhieuGiamGiaResponse phieuGiamGiaResponse = new PhieuGiamGiaResponse();
        phieuGiamGiaResponse.setId(phieuGiamGia.getId());
        phieuGiamGiaResponse.setTenVoucher(phieuGiamGia.getTenVoucher());
        phieuGiamGiaResponse.setDieuKienGiamGia(phieuGiamGia.getDieuKienGiamGia());
        phieuGiamGiaResponse.setMucGiam(phieuGiamGia.getMucGiam());
        phieuGiamGiaResponse.setGiamToiDa(phieuGiamGia.getGiamToiDa());
        phieuGiamGiaResponse.setSoLuong(phieuGiamGia.getSoLuong());
        phieuGiamGiaResponse.setNgayBatDau(phieuGiamGia.getNgayBatDau());
        phieuGiamGiaResponse.setNgayKetThuc(phieuGiamGia.getNgayKetThuc());
        phieuGiamGiaResponse.setTrangThai(phieuGiamGia.getTrangThai());
        return phieuGiamGiaResponse;
    }

}
