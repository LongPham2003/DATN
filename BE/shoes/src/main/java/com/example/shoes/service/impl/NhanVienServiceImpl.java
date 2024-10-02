package com.example.shoes.service.impl;

import com.example.shoes.dto.nhanvien.request.NhanvienRequest;
import com.example.shoes.dto.nhanvien.response.NhanVienRespone;
import com.example.shoes.repository.NhanVienRepo;
import com.example.shoes.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {
    private  final PasswordEncoder passwordEncoder;
    private final NhanVienRepo nhanVienRepo;

    @Override
    public NhanVienRespone addNhanVien(NhanvienRequest nhanVien) {
        return null;
    }
}
