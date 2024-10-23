package com.example.shoes.service;


import com.example.shoes.dto.diachi.request.CreateDiaChiRequest;
import com.example.shoes.dto.diachi.request.UpdateDiaChiRequest;
import com.example.shoes.dto.diachi.response.DiaChiResponse;
import com.example.shoes.entity.DiaChi;

import java.util.List;

public interface DiaChiService {
    List<DiaChi> getAll();
    DiaChiResponse addDiaChi(CreateDiaChiRequest diaChi);
    DiaChiResponse updateDiaChi(UpdateDiaChiRequest diaChi);
    DiaChiResponse delete(Integer id);
    DiaChiResponse getById(Integer id);
    List<DiaChi> getALlByKhachHang(Integer idKhachHang);
    DiaChi updateDiaChiAllFasle(Integer idDiaChi,Integer idKhachHang);
    DiaChi addDiaChiByIdKhachHang(Integer idKhachHang,CreateDiaChiRequest diaChiRequest);
}
