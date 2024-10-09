package com.example.shoes.service.impl;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.loai.request.LoaiRequest;
import com.example.shoes.dto.loai.response.LoaiResponse;
import com.example.shoes.entity.Loai;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.LoaiRepo;
import com.example.shoes.service.LoaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoaiServiceImpl implements LoaiService {
    @Autowired
    private LoaiRepo loaiRepository;

    @Override
    public PhanTrangResponse<Loai> getLoai(int pageNumber, int pageSize, String keyword) {
        // Tạo đối tượng Pageable với số trang và kích thước trang
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        // Lấy danh sách  từ repo
        Page<Loai> page = loaiRepository.getLoai(pageable, keyword);
        // Tạo đối tượng PhanTrangResponse để trả về kết quả
        PhanTrangResponse<Loai> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());
        return phanTrangResponse;
    }

    // Phương thức lấy  theo id
    @Override
    public LoaiResponse getById(Integer id) {
        Loai loai = loaiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        return convertToResponse(loai);
    }

    // Phương thức thêm moi
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
        Loai loai = loaiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        loai.setTen(request.getTen());
        loai.setTrangThai(request.getTrangThai());
        Loai updated = loaiRepository.save(loai);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!loaiRepository.existsById(id)) {
            throw new AppException(ErrorCode.MATERIAL_NOT_FOUND);
        }
        loaiRepository.DeleteLoai(id);
    }

    @Override
    public List<LoaiResponse> search(String ten, Boolean trangThai) {
        List<Loai> loaiList;

        if (ten != null && trangThai != null) {
            loaiList = loaiRepository.findByTenContainingIgnoreCaseAndTrangThai(ten, trangThai);
        } else if (ten != null) {
            loaiList = loaiRepository.findByTenContainingIgnoreCase(ten);
        } else if (trangThai != null) {
            loaiList = loaiRepository.findByTrangThai(trangThai);
        } else {
            loaiList = loaiRepository.findAll();
        }
        // Chuyển đổi danh sách  thành danh sách LoaiResponse
        return loaiList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<LoaiResponse> getAll() {
        // Lấy tất cả các ChatLieu từ repository
        List<Loai> list =loaiRepository.findAll();

        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Phương thức chuyển đổi Loai thành LoaiResponse
    private LoaiResponse convertToResponse(Loai loai) {
        LoaiResponse loaiResponse = new LoaiResponse();
        loaiResponse.setId(loai.getId());
        loaiResponse.setTen(loai.getTen());
        loaiResponse.setTrangThai(loai.getTrangThai());
        return loaiResponse;
    }
}
