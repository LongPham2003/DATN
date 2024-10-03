package com.example.shoes.service;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.nhanvien.request.NhanVienUpdateRequest;
import com.example.shoes.dto.nhanvien.request.NhanvienAddRequest;
import com.example.shoes.entity.NhanVien;

import java.util.List;


public interface NhanVienService {

    PhanTrangResponse<NhanVien> getNhanVien(int pageNumber, int pageSize, String keyword);
    NhanVien addNhanVien(NhanvienAddRequest request);
    NhanVien updateNhanVien(Integer id , NhanVienUpdateRequest request);
    NhanVien deleteNhanVien(Integer id);
}
