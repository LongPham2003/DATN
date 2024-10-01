package com.example.shoes.service.impl;

import com.example.shoes.dto.degiay.request.DeGiayRequet;
import com.example.shoes.dto.degiay.response.DeGiayResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.entity.DeGiay;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.DeGiayRepo;
import com.example.shoes.service.DeGiayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeGiayServiceImpl implements DeGiayService {
    @Autowired
    private DeGiayRepo deGiayRepo;
    @Override
    public List<DeGiayResponse> findAll() {
        List<DeGiay> list =deGiayRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DeGiayResponse getById(Integer id) {
        DeGiay deGiay = deGiayRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));
        return convertToResponse(deGiay);
    }

    @Override
    public DeGiayResponse create(DeGiayRequet request) {
        DeGiay deGiay = new DeGiay();
        deGiay.setTen(request.getTen());
        deGiay.setTrangThai(request.getTrangThai());
        DeGiay saveDeGiay =deGiayRepo.save(deGiay);
        return convertToResponse(saveDeGiay);
    }

    @Override
    public DeGiayResponse update(Integer id, DeGiayRequet request) {
        DeGiay deGiay = deGiayRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND));
        deGiay.setTen(request.getTen());
        deGiay.setTrangThai(request.getTrangThai());
        DeGiay updated =deGiayRepo.save(deGiay);
        return convertToResponse(updated);
    }

    @Override
    public void delete(Integer id) {
        if (!deGiayRepo.existsById(id)) {
            throw new AppException(ErrorCode.SHOE_SOLE_NOT_FOUND);
        }
        deGiayRepo.deleteById(id);
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

        return deGiayListList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private DeGiayResponse convertToResponse(DeGiay deGiay) {
        DeGiayResponse deGiayResponse = new DeGiayResponse();
        deGiayResponse.setId(deGiay.getId());
        deGiayResponse.setTen(deGiay.getTen());
        deGiayResponse.setTrangThai(deGiay.getTrangThai());
        return deGiayResponse;
    }
}