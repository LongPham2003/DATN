package com.example.shoes.service.impl;

import com.example.shoes.dto.taikhoan.request.UpdateTaiKhoanRequest;
import com.example.shoes.dto.taikhoan.response.TaiKhoanResponse;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.TaiKhoanRepo;
import com.example.shoes.service.TaikhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanServiceImpl implements TaikhoanService {
    @Autowired
    TaiKhoanRepo taiKhoanRepo;

    @Override
    public List<TaiKhoanResponse> finAllTaiKhoan() {
        List<TaiKhoan> list = taiKhoanRepo.findAll();
        List<TaiKhoanResponse> responseList = new ArrayList<>();
        for (TaiKhoan taiKhoan : list) {
            TaiKhoanResponse taiKhoanResponse = new TaiKhoanResponse();
            taiKhoanResponse.setId(taiKhoan.getId());
            taiKhoanResponse.setEmail(taiKhoan.getEmail());
            taiKhoanResponse.setTrangThai(taiKhoan.getTrangThai());
            responseList.add(taiKhoanResponse);
        }
        return responseList;

    }

    @Override
    public Boolean updateTaiKhoan(UpdateTaiKhoanRequest request) {
        Optional<TaiKhoan> optional = taiKhoanRepo.findById(request.getId());
        if (!optional.isPresent()) {
           throw  new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        TaiKhoan taiKhoan = optional.get();
        taiKhoan.setTrangThai(request.getTrangThai());
        taiKhoanRepo.save(taiKhoan);

        return  true;
    }
}
