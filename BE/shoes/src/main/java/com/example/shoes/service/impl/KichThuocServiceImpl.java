package com.example.shoes.service.impl;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
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


@Service
public class KichThuocServiceImpl implements KichThuocService {
    @Autowired
    private KichThuocRepo kichThuocRepo;

    @Override
    public PhanTrangResponse<KichThuoc> getKichThuoc(int pageNumber, int pageSize, String keyword) {
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        Page<KichThuoc> page = kichThuocRepo.getKichThuoc(pageable, keyword);
        PhanTrangResponse<KichThuoc> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());
        return phanTrangResponse;
    }


    @Override
    public KichThuocResponse getById(Integer id) {
        KichThuoc kichThuoc = kichThuocRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SIZE_NOT_FOUND));
        return convertToResponse(kichThuoc);
    }

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
        if (!kichThuocRepo.existsById(id)) {
            throw new AppException(ErrorCode.MATERIAL_NOT_FOUND);
        }
        kichThuocRepo.deleteById(id);
    }

    private KichThuocResponse convertToResponse(KichThuoc kichThuoc) {
        KichThuocResponse kichThuocResponse = new KichThuocResponse();
        kichThuocResponse.setId(kichThuoc.getId());
        kichThuocResponse.setKichThuoc(kichThuoc.getKichThuoc());
        kichThuocResponse.setTrangThai(kichThuoc.getTrangThai());
        return kichThuocResponse;
    }
}
