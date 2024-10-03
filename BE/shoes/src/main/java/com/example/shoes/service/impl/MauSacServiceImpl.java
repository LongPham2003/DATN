package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.mausac.request.MauSacRequest;
import com.example.shoes.dto.mausac.response.MauSacResponse;

import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.MauSac;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.MauSacRepo;
import com.example.shoes.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MauSacServiceImpl implements MauSacService {
    @Autowired
    private MauSacRepo mauSacRepo;

    @Override
    public PhanTrangResponse<MauSac> getMauSac(int pageNumber, int pageSize, String keyword) {
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        Page<MauSac> page = mauSacRepo.getMauSac(pageable, keyword);
        PhanTrangResponse<MauSac> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());
        return phanTrangResponse;
    }

    @Override
    public MauSacResponse getById(Integer id) {
        MauSac mauSac = mauSacRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));
        return convertToResponse(mauSac);
    }

    @Override
    public MauSacResponse create(MauSacRequest request) {
        if(mauSacRepo.existsByTen(request.getTen())){
            throw new AppException(ErrorCode.ATTRIBUTE_EXISTED);
        }
        MauSac mauSac = new MauSac();
        mauSac.setTen(request.getTen());
        mauSac.setTrangThai(request.getTrangThai());
        MauSac saved = mauSacRepo.save(mauSac);
        return convertToResponse(saved);
    }

    @Override
    public MauSacResponse update(Integer id, MauSacRequest request) {
        MauSac mauSac = mauSacRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COLOR_NOT_FOUND));
        mauSac.setTen(request.getTen());
        mauSac.setTrangThai(request.getTrangThai());
        MauSac updated = mauSacRepo.save(mauSac);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!mauSacRepo.existsById(id)) {
            throw new AppException(ErrorCode.MATERIAL_NOT_FOUND);
        }
        mauSacRepo.deleteById(id);
    }


    @Override
    public List<MauSacResponse> search(String ten, Boolean trangThai) {
        List<MauSac> mauSacList;

        if (ten != null && trangThai != null) {
            mauSacList = mauSacRepo.findByTenContainingIgnoreCaseAndTrangThai(ten, trangThai);
        } else if (ten != null) {
            mauSacList = mauSacRepo.findByTenContainingIgnoreCase(ten);
        } else if (trangThai != null) {
            mauSacList = mauSacRepo.findByTrangThai(trangThai);
        } else {
            mauSacList = mauSacRepo.findAll();
        }

        return mauSacList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    private MauSacResponse convertToResponse(MauSac mauSac) {
        MauSacResponse mauSacResponse = new MauSacResponse();
        mauSacResponse.setId(mauSac.getId());
        mauSacResponse.setTen(mauSac.getTen());
        mauSacResponse.setTrangThai(mauSac.getTrangThai());
        return mauSacResponse;
    }
}
