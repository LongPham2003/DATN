package com.example.shoes.controller;


import com.example.shoes.dto.thongke.response.BieuDoNgayTrongTuan;
import com.example.shoes.dto.thongke.response.DoanhThu;
import com.example.shoes.dto.thongke.response.SanPhamBanChay;
import com.example.shoes.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/thongke")
public class ThongKeController {
    private final ThongKeService thongkeService;

    @GetMapping("/ngay-tuy-chinh")
    public  DoanhThu ngayTuyChinh( @RequestParam("date") String date){
        LocalDate localDate = LocalDate.parse(date);
        return thongkeService.ngayTuyChinh(localDate);
    }

    @GetMapping("/ngay-hom-nay")
    public DoanhThu ngayHomNay() {
        return thongkeService.doanhThuHomNay();
    }

    @GetMapping("/tuan")
    public DoanhThu tuan() {
        return thongkeService.doanhThuTuan();
    }

    @GetMapping("/thang")
    public DoanhThu thang() {
        return thongkeService.doanhThuThang();
    }

    @GetMapping("/nam")
    public DoanhThu nam() {
        return thongkeService.doanhThuNam();
    }

    @GetMapping("/spbanchay/homnay")
    public List<SanPhamBanChay> spbanchayHomNay() {
        return thongkeService.HomNay();
    }

    @GetMapping("/spbanchay/tuannay")
    public   List<SanPhamBanChay> spbanchayTuanNay() {
        return thongkeService.TuanNay();
    }

    @GetMapping("/spbanchay/thangnay")
    public   List<SanPhamBanChay> spbanchayThangNay() {
        return thongkeService.ThangNay();
    }

    @GetMapping("/spbanchay/namnay")
    public  List<SanPhamBanChay> spbanchayNamNay() {
        return thongkeService.NamNay();
    }

    @GetMapping("/sanphambanchay/khoangngay")
    public List<SanPhamBanChay> khoangNgay(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {
        return thongkeService.khoangNgay(startDate, endDate);
    }

    @GetMapping("/bieudo/cacngaytrongtuan")
    public  List<BieuDoNgayTrongTuan> cacNgayTrongTuan() {
        return thongkeService.cacNgayTrongTuan();
    }
}
