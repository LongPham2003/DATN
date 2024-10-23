package com.example.shoes.service.impl;

import com.example.shoes.dto.diachi.request.CreateDiaChiRequest;
import com.example.shoes.dto.diachi.request.UpdateDiaChiRequest;
import com.example.shoes.dto.diachi.response.DiaChiResponse;
import com.example.shoes.entity.DiaChi;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.DiaChiRepo;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.service.DiaChiService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {

    private final DiaChiRepo diaChiRepo;
    private final KhachHangRepo khachHangRepo;

    @Override
    public List<DiaChi> getAll() {
        return diaChiRepo.findAll();
    }

    @Override
    public DiaChiResponse addDiaChi(CreateDiaChiRequest req) {
        DiaChi diaChi = new DiaChi();
        diaChi.setTinhThanhPho(req.getTinhThanhPho());
        diaChi.setHuyenQuan(req.getHuyenQuan());
        diaChi.setDiaChiMacDinh(req.getDiaChiMacDinh());
        diaChi.setXaPhuong(req.getXaPhuong());
        diaChi.setKhachHang(req.getKhachHang());

        diaChiRepo.save(diaChi);

        DiaChiResponse response = new DiaChiResponse();
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
        diaChi.setTinhThanhPho(req.getTinhThanhPho());
        diaChi.setHuyenQuan(req.getHuyenQuan());
        diaChi.setDiaChiMacDinh(req.getDiaChiMacDinh());
        diaChi.setXaPhuong(req.getXaPhuong());
        diaChi.setKhachHang(req.getKhachHang());

        diaChiRepo.save(diaChi);

        DiaChiResponse response = new DiaChiResponse();
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

    @Override
    public List<DiaChi> getALlByKhachHang(Integer idKhachHang) {
       return diaChiRepo.findDiaChiByKhachHangId(idKhachHang);
    }

    @Override
    @Transactional
    public DiaChi updateDiaChiAllFasle(Integer idDiaChi, Integer idKhachHang) {
        diaChiRepo.unsetAllOtherDefaultAddresses(idKhachHang, idDiaChi);

        // Cập nhật địa chỉ hiện tại thành true
        DiaChi diaChi = diaChiRepo.findById(idDiaChi)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));
        diaChi.setDiaChiMacDinh(true);

        return diaChiRepo.save(diaChi);
    }

    @Override
    @Transactional
    public DiaChi addDiaChiByIdKhachHang(Integer idKhachHang,CreateDiaChiRequest req) {
       KhachHang khachHang = khachHangRepo.findById(idKhachHang).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
       DiaChi diaChi = new DiaChi();
        diaChi.setTinhThanhPho(req.getTinhThanhPho());
        diaChi.setHuyenQuan(req.getHuyenQuan());
        diaChi.setXaPhuong(req.getXaPhuong());
        diaChi.setSoNhaDuongThonXom(req.getSoNhaDuongThonXom());
        diaChi.setDiaChiChiTiet(req.getDiaChiChiTiet());
        diaChi.setKhachHang(khachHang);

        diaChi.setDiaChiMacDinh(true);

         DiaChi dc =  diaChiRepo.save(diaChi);

        updateDiaChiAllFasle(dc.getId(),idKhachHang);

        return dc;
    }


}
