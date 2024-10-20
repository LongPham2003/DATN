package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.degiay.request.DeGiayRequet;
import com.example.shoes.dto.degiay.response.DeGiayResponse;
import com.example.shoes.entity.DeGiay;
import com.example.shoes.entity.MauSac;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.DeGiayRepo;
import com.example.shoes.service.DeGiayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class DeGiayServiceImpl implements DeGiayService {
    @Autowired
    private DeGiayRepo deGiayRepo;

    @Override
    public PhanTrangResponse<DeGiay> getDeGiay(int pageNumber, int pageSize, String keyword) {
        // Tạo đối tượng Pageable với số trang và kích thước trang
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        // Lấy danh sách  từ repo
        Page<DeGiay> page = deGiayRepo.getDeGiay(pageable, keyword);
        PhanTrangResponse<DeGiay> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());
        return phanTrangResponse;
    }
    // Phương thức lấy  theo id
    @Override
    public DeGiayResponse getById(Integer id) {
        DeGiay deGiay = deGiayRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));
        return convertToResponse(deGiay);
    }
    // Phương thức thêm moi
    @Override
    public DeGiayResponse create(DeGiayRequet request) {
        if (deGiayRepo.existsByTen(request.getTen())) {
            throw new AppException(ErrorCode.ATTRIBUTE_EXISTED);
        }
        DeGiay deGiay = new DeGiay();
        deGiay.setTen(request.getTen());
        deGiay.setTrangThai(request.getTrangThai());
        DeGiay saveDeGiay = deGiayRepo.save(deGiay);
        return convertToResponse(saveDeGiay);
    }

    @Override
    public DeGiayResponse update(Integer id, DeGiayRequet request) {
        DeGiay deGiay = deGiayRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));
        deGiay.setTen(request.getTen());
        deGiay.setTrangThai(request.getTrangThai());
        DeGiay updated = deGiayRepo.save(deGiay);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {

        DeGiay deGiay=deGiayRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));
        if(deGiay.getTrangThai()==true) {
            deGiay.setTrangThai(false);
        }else {
            deGiay.setTrangThai(true);
        }
        deGiayRepo.save(deGiay);
    }

    @Override
    public List<DeGiayResponse> search(String ten, Boolean trangThai) {
        List<DeGiay> deGiayListList;

        if (ten != null && trangThai != null) {
            deGiayListList = deGiayRepo.findByTenContainingIgnoreCaseAndTrangThai(ten, trangThai);
        } else if (ten != null) {
            deGiayListList = deGiayRepo.findByTenContainingIgnoreCase(ten);
        } else if (trangThai != null) {
            deGiayListList = deGiayRepo.findByTrangThai(trangThai);
        } else {
            deGiayListList = deGiayRepo.findAll();
        }
    // Chuyển đổi danh sách  thành danh sách DeGiayResponse
        return deGiayListList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllTenDeGiay() {
        return deGiayRepo.findAll().stream().map(DeGiay::getTen).collect(Collectors.toList());
    }

    public List<DeGiayResponse> getAll() {
        // Lấy tất cả các ChatLieu từ repository
        List<DeGiay> list =deGiayRepo.getAllTrangThaiTrue();

        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // Phương thức chuyển đổi DeGiay thành DeGiayResponse
    private DeGiayResponse convertToResponse(DeGiay deGiay) {
        DeGiayResponse deGiayResponse = new DeGiayResponse();
        deGiayResponse.setId(deGiay.getId());
        deGiayResponse.setTen(deGiay.getTen());
        deGiayResponse.setTrangThai(deGiay.getTrangThai());
        return deGiayResponse;
    }
}
