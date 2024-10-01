package com.example.shoes.service;


import com.example.shoes.dto.nhanvien.request.NhanvienRequest;
import com.example.shoes.dto.nhanvien.response.NhanVienRespone;
import com.example.shoes.entity.NhanVien;

public interface NhanVienService {
    NhanVienRespone addNhanVien(NhanvienRequest request);
}
