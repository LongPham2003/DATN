package com.example.shoes.controllerClient;

import com.example.shoes.entity.KhachHang;
import com.example.shoes.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/client/khachhang")
@RequiredArgsConstructor
public class KhachHangControllerClient {
    private final KhachHangService khachHangService;

    @GetMapping("/timtheoEmail")
    public Optional<KhachHang> timtheoEmail(@RequestParam("email") String email) {
            return khachHangService.timTheoEmail(email);
    }
}
