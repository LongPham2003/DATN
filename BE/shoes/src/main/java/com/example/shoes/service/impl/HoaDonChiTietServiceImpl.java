package com.example.shoes.service.impl;


import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose;
import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietResponse;
import com.example.shoes.entity.HoaDonChiTiet;
import com.example.shoes.repository.HoaDonChiTietRepo;
import com.example.shoes.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepo hoaDonChiTietRepo;

    @Override
    public List<HoaDonChiTietResponse> getAllHoaDonCT() {
        // Lấy tất cả hóa đơn
        List<HoaDonChiTiet> hoaDonChiTiets = hoaDonChiTietRepo.findAll();

        // Chuyển danh sách hóa đơn thành danh sách response
        List<HoaDonChiTietResponse> hoaDonChiTietResponse = hoaDonChiTiets.stream()
                .map(this::converToHoaDonResponse)
                .toList();

        // Trả về danh sách response
        return hoaDonChiTietResponse;
    }

    @Override
    public List<HoaDonChiTietBHRespose> getSPCTByIdHoaDon(Integer IdhoaDon) {
        List<HoaDonChiTiet> hdbh= hoaDonChiTietRepo.getSPCTByIdHoaDon(IdhoaDon);

        List<HoaDonChiTietBHRespose> hoaDonChiTietBanHangResponse = hdbh.stream()
                .map(this::convertToHDCTBanHangResponse)
                .toList();

        return hoaDonChiTietBanHangResponse;
    }

    private HoaDonChiTietBHRespose convertToHDCTBanHangResponse(HoaDonChiTiet hoaDonChiTiet) {
        HoaDonChiTietBHRespose hdbh =new HoaDonChiTietBHRespose();
        hdbh.setId(hoaDonChiTiet.getId());
        hdbh.setIdHoaDon(hoaDonChiTiet.getIdHoaDon().getId());
        hdbh.setIdSpct(hoaDonChiTiet.getIdSpct().getId());
        hdbh.setTenSanPham(hoaDonChiTiet.getIdSpct().getIdSanPham().getTenSanPham());
        hdbh.setMaSanPham(hoaDonChiTiet.getIdSpct().getIdSanPham().getMa());
        hdbh.setChatLieu(hoaDonChiTiet.getIdSpct().getIdChatLieu().getTen());
        hdbh.setMauSac(hoaDonChiTiet.getIdSpct().getIdMauSac().getTen());
        hdbh.setKichThuoc(hoaDonChiTiet.getIdSpct().getIdKichThuoc().getKichThuoc());
        hdbh.setThuongHieu(hoaDonChiTiet.getIdSpct().getIdThuongHieu().getTen());
        hdbh.setDeGiay(hoaDonChiTiet.getIdSpct().getIdDeGiay().getTen());
        hdbh.setDonGia(hoaDonChiTiet.getDonGia());
        hdbh.setSoLuong(hoaDonChiTiet.getSoLuong());

        return hdbh;
    }

    private HoaDonChiTietResponse converToHoaDonResponse(HoaDonChiTiet hoaDonChiTiet) {
        HoaDonChiTietResponse hoaDonChiTietResponse = new HoaDonChiTietResponse();
        hoaDonChiTietResponse.setId(hoaDonChiTiet.getId());
        hoaDonChiTietResponse.setIdHoaDon(hoaDonChiTiet.getIdHoaDon().getId());
        hoaDonChiTietResponse.setIdSpct(hoaDonChiTiet.getIdSpct().getId());
        hoaDonChiTietResponse.setSoLuong(hoaDonChiTiet.getSoLuong());
        hoaDonChiTietResponse.setDonGia(hoaDonChiTiet.getDonGia());
        hoaDonChiTietResponse.setTrangThai(hoaDonChiTiet.getTrangThai());
        return hoaDonChiTietResponse;
    }
}
