package com.example.shoes.service;

import com.example.shoes.dto.thongke.response.BieuDoNgayTrongTuan;
import com.example.shoes.dto.thongke.response.DoanhThu;
import com.example.shoes.dto.thongke.response.SanPhamBanChay;

import java.util.List;


public interface ThongKeService {
    DoanhThu ngayTuyChinh(String date);
    DoanhThu doanhThuHomNay();
    DoanhThu doanhThuTuan();
    DoanhThu doanhThuThang();
    DoanhThu doanhThuNam();

    List<SanPhamBanChay> HomNay();
    List<SanPhamBanChay> TuanNay();
    List<SanPhamBanChay> ThangNay();
    List<SanPhamBanChay> NamNay();
    List<SanPhamBanChay> khoangNgay(String startdate, String enddate);

    List<BieuDoNgayTrongTuan> cacNgayTrongTuan();
}
