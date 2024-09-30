package com.example.shoes.service.impl;

import com.example.shoes.dto.diachi.request.CreateDiaChiRequest;
import com.example.shoes.dto.diachi.request.UpdateDiaChiRequest;
import com.example.shoes.dto.diachi.response.DiaChiResponse;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.repository.DiaChiRepo;
import com.example.shoes.service.DiaChiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {

    private final DiaChiRepo diaChiRepo;

    @Override
    public List<DiaChi> getAll() {
        return diaChiRepo.findAll();
    }

    @Override
    public DiaChiResponse addDiaChi(CreateDiaChiRequest req) {
        DiaChi diaChi = new DiaChi();
        diaChi.setTen(req.getTen());
        diaChi.setSdt(req.getSdt());
        diaChi.setTinhThanhPho(req.getTinhThanhPho());
        diaChi.setHuyenQuan(req.getHuyenQuan());
        diaChi.setDiaChiMacDinh(req.getDiaChiMacDinh());
        diaChi.setXaPhuong(req.getXaPhuong());
        diaChi.setKhachHang(req.getKhachHang());

        diaChiRepo.save(diaChi);

        DiaChiResponse response = new DiaChiResponse();
        response.setTen(diaChi.getTen());
        response.setSdt(diaChi.getSdt());
        response.setTinhThanhPho(diaChi.getTinhThanhPho());
        response.setHuyenQuan(diaChi.getHuyenQuan());
        response.setXaPhuong(diaChi.getXaPhuong());
        response.setDiaChiMacDinh(diaChi.getDiaChiMacDinh());
        return response;

    }

    @Override
    public DiaChiResponse updateDiaChi(UpdateDiaChiRequest req) {
        DiaChi diaChi = new DiaChi();
        diaChi.setId(req.getId());
        diaChi.setTen(req.getTen());
        diaChi.setSdt(req.getSdt());
        diaChi.setTinhThanhPho(req.getTinhThanhPho());
        diaChi.setHuyenQuan(req.getHuyenQuan());
        diaChi.setDiaChiMacDinh(req.getDiaChiMacDinh());
        diaChi.setXaPhuong(req.getXaPhuong());
        diaChi.setKhachHang(req.getKhachHang());

        diaChiRepo.save(diaChi);

        DiaChiResponse response = new DiaChiResponse();
        response.setTen(diaChi.getTen());
        response.setSdt(diaChi.getSdt());
        response.setTinhThanhPho(diaChi.getTinhThanhPho());
        response.setHuyenQuan(diaChi.getHuyenQuan());
        response.setXaPhuong(diaChi.getXaPhuong());
        response.setDiaChiMacDinh(diaChi.getDiaChiMacDinh());
        return response;
    }

    @Override
    public DiaChiResponse delete(Integer id) {
        return null;
    }

    @Override
    public DiaChiResponse getById(Integer id) {
        return null;
    }


}
