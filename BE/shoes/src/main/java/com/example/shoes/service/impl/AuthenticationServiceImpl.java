package com.example.shoes.service.impl;

import com.example.shoes.dto.authentication.request.SignUpRequest;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.TaiKhoanRepo;
import com.example.shoes.service.AuthenticationService;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private TaiKhoanRepo taiKhoanRepo;

    @Autowired
    private KhachHangRepo khachHangRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public String signUp(SignUpRequest signUpRequest) {
       if(taiKhoanRepo.existsByEmail(signUpRequest.getEmail())){
           throw  new AppException(ErrorCode.USER_NOT_EXISTED);
       }
        if (signUpRequest.getPassword().length() < 8) {
            throw new ValidationException("Mật khẩu phải có ít nhất 8 ký tự");
        }

       KhachHang khachHang = new KhachHang();
       khachHang.setEmail(signUpRequest.getEmail());
       khachHang.setTrangThai(true);
       khachHangRepo.save(khachHang);

       TaiKhoan taiKhoan = new TaiKhoan();
       taiKhoan.setEmail(signUpRequest.getEmail());
       taiKhoan.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
       taiKhoan.setTrangThai(true);
       taiKhoan.setIdKhachHang(khachHang);
       taiKhoanRepo.save(taiKhoan);

        return "Đăng ký thành công";
    }
}
