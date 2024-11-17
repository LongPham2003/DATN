package com.example.shoes.service.impl;


import com.example.shoes.dto.thongke.response.BieuDoNgayTrongTuan;
import com.example.shoes.dto.thongke.response.DoanhThu;
import com.example.shoes.dto.thongke.response.SanPhamBanChay;
import com.example.shoes.repository.ThongKeRepo;
import com.example.shoes.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ThongKeimpl implements ThongKeService {
    private  final  ThongKeRepo thongKeRepo;


    @Override
    public DoanhThu ngayTuyChinh(String date) {
        return thongKeRepo.ngayTuyChinh(date);
    }

    @Override
    public DoanhThu doanhThuHomNay() {
        return thongKeRepo.doanhThuHomNay();
    }

    @Override
    public DoanhThu doanhThuTuan() {
        return thongKeRepo.doanhThuTuan();
    }

    @Override
    public DoanhThu doanhThuThang() {
        return thongKeRepo.doanhThuThang();
    }

    @Override
    public DoanhThu doanhThuNam() {
        return thongKeRepo.doanhThuNam();
    }

    @Override
    public List<SanPhamBanChay> HomNay() {
        return thongKeRepo.SPBanChayHomNay();
    }

    @Override
    public   List<SanPhamBanChay> TuanNay() {
        return thongKeRepo.SPBanChayTuanNay();
    }

    @Override
    public   List<SanPhamBanChay> ThangNay() {
        return thongKeRepo.SPBanChayThang();
    }

    @Override
    public   List<SanPhamBanChay> NamNay() {
        return thongKeRepo.SPBanChayNamNay();
    }

    @Override
    public List<SanPhamBanChay> khoangNgay(String startdate, String enddate) {
        return thongKeRepo.khoangNgay(startdate, enddate);
    }

    @Override
    public List<BieuDoNgayTrongTuan> cacNgayTrongTuan() {
        return thongKeRepo.cacNgayTrongTuan();
    }
}
