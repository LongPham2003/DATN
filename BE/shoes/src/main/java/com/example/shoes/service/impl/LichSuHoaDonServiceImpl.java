package com.example.shoes.service.impl;

import com.example.shoes.dto.lichsuhoadon.response.LichSuHoaDonResponse;
import com.example.shoes.entity.LichSuHoaDon;
import com.example.shoes.repository.LichSuHoaDonRepo;
import com.example.shoes.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {
    @Autowired
    private LichSuHoaDonRepo lichSuHoaDonRepo;

    @Override
    public List<LichSuHoaDonResponse> getAll() {
        // Lấy tất cả hóa đơn
        List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonRepo.findAll();
        // Chuyển danh sách hóa đơn thành danh sách response
        List<LichSuHoaDonResponse> lichSuHoaDonResponses = lichSuHoaDons.stream()
                .map(this::converToResponse)
                .toList();
        // Trả về danh sách response
        return lichSuHoaDonResponses ;
    }
    private LichSuHoaDonResponse converToResponse(LichSuHoaDon lichSuHoaDon) {
        LichSuHoaDonResponse lichSuHoaDonResponse=new LichSuHoaDonResponse();
        lichSuHoaDonResponse.setId(lichSuHoaDon.getId());
        lichSuHoaDonResponse.setIdHoaDon(lichSuHoaDon.getIdHoaDon().getId());
        lichSuHoaDonResponse.setMoTa(lichSuHoaDon.getMoTa());
        lichSuHoaDonResponse.setThoiGian(lichSuHoaDon.getThoiGian());
        lichSuHoaDonResponse.setNguoiThucHien(lichSuHoaDon.getNguoiThucHien());
        return lichSuHoaDonResponse;
    }
}
