package com.example.shoes.service.impl;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.KichThuoc;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.KichThuocRepo;
import com.example.shoes.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class KichThuocServiceImpl implements KichThuocService {
    @Autowired
    private KichThuocRepo kichThuocRepo;

    @Override
    public PhanTrangResponse<KichThuoc> getKichThuoc(int pageNumber, int pageSize, String keyword) {
        // Tạo đối tượng Pageable với số trang và kích thước trang
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        // Lấy danh sách  từ repo
        Page<KichThuoc> page = kichThuocRepo.getKichThuoc(pageable, keyword);
        // Tạo đối tượng PhanTrangResponse để trả về kết quả
        PhanTrangResponse<KichThuoc> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());
        return phanTrangResponse;
    }

    // Phương thức lấy  theo id
    @Override
    public KichThuocResponse getById(Integer id) {
        KichThuoc kichThuoc = kichThuocRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));
        return convertToResponse(kichThuoc);
    }
    // Phương thức thêm moi
    @Override
    public KichThuocResponse create(KichThuocRequest request) {
        if(kichThuocRepo.existsByKichThuoc(request.getKichThuoc())){
            throw new AppException(ErrorCode.ATTRIBUTE_EXISTED);
        }
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

        KichThuoc kichThuoc=kichThuocRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));
        boolean tt=kichThuoc.getTrangThai();
        if(tt==true){
            kichThuoc.setTrangThai(false);
        }else {
            kichThuoc.setTrangThai(true);
        };
        kichThuocRepo.save(kichThuoc);
    }


    @Override
    public List<KichThuocResponse> search(String kichThuoc, Boolean trangThai) {
        List<KichThuoc> kichThuocList;

        if (kichThuoc != null && trangThai != null) {
            kichThuocList = kichThuocRepo.findByKichThuocContainingIgnoreCaseAndTrangThai(kichThuoc, trangThai);
        } else if (kichThuoc != null) {
            kichThuocList = kichThuocRepo.findByKichThuocContainingIgnoreCase(kichThuoc);
        } else if (trangThai != null) {
            kichThuocList = kichThuocRepo.findByTrangThai(trangThai);
        } else {
            kichThuocList = kichThuocRepo.findAll();
        }
     // Chuyển đổi danh sách  thành danh sách KichThuocResponse
        return kichThuocList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<KichThuocResponse> getAll() {
        // Lấy tất cả các ChatLieu từ repository
        List<KichThuoc> list =kichThuocRepo.getAllTrangThaiTrue();

        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllTenKichThuoc() {
        return kichThuocRepo.findAll().stream().map(KichThuoc::getKichThuoc).collect(Collectors.toList());
    }

    // Phương thức chuyển đổi KichThuoc thành KichThuocResponse
    private KichThuocResponse convertToResponse(KichThuoc kichThuoc) {
        KichThuocResponse kichThuocResponse = new KichThuocResponse();
        kichThuocResponse.setId(kichThuoc.getId());
        kichThuocResponse.setKichThuoc(kichThuoc.getKichThuoc());
        kichThuocResponse.setTrangThai(kichThuoc.getTrangThai());
        return kichThuocResponse;
    }
}
