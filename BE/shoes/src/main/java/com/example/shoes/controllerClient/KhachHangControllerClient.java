package com.example.shoes.controllerClient;

import com.example.shoes.dto.hoadonchitiet.response.HoaDonChiTietBHRespose;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.HoaDonChiTietService;
import com.example.shoes.service.KhachHangService;
import com.example.shoes.service.impl.HoaDonChiTietServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/client/khachhang")
@RequiredArgsConstructor
public class KhachHangControllerClient {
    private final KhachHangService khachHangService;
    private final HoaDonChiTietServiceImpl hoaDonChiTietServiceImpl;

    @GetMapping("/timtheoEmail")
    public Optional<KhachHang> timtheoEmail(@RequestParam("email") String email) {
            return khachHangService.timTheoEmail(email);
    }
    @GetMapping("/SPCTbyidHD/{idHoaDon}")
    public ApiResponse<List<HoaDonChiTietBHRespose>> getSPCTbyidHD(@PathVariable("idHoaDon") Integer idHoaDon) {
        List<HoaDonChiTietBHRespose> hdbh = hoaDonChiTietServiceImpl.getSPCTByIdHoaDon(idHoaDon);

        return ApiResponse.<List<HoaDonChiTietBHRespose>>builder().result(hdbh).build();
    }
}
