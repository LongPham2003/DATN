package com.example.shoes.service;

import com.example.shoes.dto.taikhoan.response.TaiKhoanResponse;
import com.example.shoes.entity.TaiKhoan;

import java.util.List;

public interface TaikhoanService {

    List<TaiKhoanResponse> finAllTaiKhoan();

    
}
