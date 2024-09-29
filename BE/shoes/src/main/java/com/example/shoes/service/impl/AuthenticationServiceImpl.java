package com.example.shoes.service.impl;

import com.example.shoes.dto.authentication.request.DoiMatKhauRequest;
import com.example.shoes.dto.authentication.request.LoginRequest;
import com.example.shoes.dto.authentication.request.ResetPass;
import com.example.shoes.dto.authentication.request.SignUpRequest;
import com.example.shoes.email.EmailService;
import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.KhachHangRepo;
import com.example.shoes.repository.TaiKhoanRepo;
import com.example.shoes.service.AuthenticationService;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private TaiKhoanRepo taiKhoanRepo;

    @Autowired
    private KhachHangRepo khachHangRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;


    @Override
    public String signUp(SignUpRequest signUpRequest) {
        if (taiKhoanRepo.existsByEmail(signUpRequest.getEmail())) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if (signUpRequest.getPassword().length() < 8) {
            throw new ValidationException("Mật khẩu phải có ít nhất 8 ký tự");
        }



        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setEmail(signUpRequest.getEmail());
        taiKhoan.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        taiKhoan.setTrangThai(true);
        String subject = "Xin chào, bạn đã đăng ký thành công tài khoản. ";
        emailService.sendEmailPasword(taiKhoan.getEmail(), subject, signUpRequest.getPassword());
        taiKhoanRepo.save(taiKhoan);

        return "Đăng ký thành công";
    }

    @Override
    public boolean singIn(LoginRequest loginRequest) {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(loginRequest.getEmail());
        if (taiKhoan == null) {
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), taiKhoan.getPassword()) && taiKhoan != null) {
            throw new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }
        return true;
    }

    @Override
    public String resetPass(ResetPass resetPass) {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(resetPass.getEmail());
        if (taiKhoan == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        String password = generatePass();

        taiKhoan.setPassword(passwordEncoder.encode(password));

        String subject = "Mật khẩu của bạn là  . ";
        emailService.sendEmailPasword(resetPass.getEmail(), subject, password);
        taiKhoanRepo.save(taiKhoan);
        return "Thành công";
    }

    @Override
    public String doiMatKhau(DoiMatKhauRequest doiMatKhauRequest) {
        TaiKhoan taiKhoan = taiKhoanRepo.findByEmail(doiMatKhauRequest.getEmail());
        if (taiKhoan == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        if (passwordEncoder.matches(doiMatKhauRequest.getPassword(), taiKhoan.getPassword())&&taiKhoan!=null) {
            taiKhoan.setPassword(passwordEncoder.encode(doiMatKhauRequest.getNewPassword()));
            taiKhoanRepo.save(taiKhoan);
        }else {
            throw  new AppException(ErrorCode.PASSWORD_OR_EMAIL_FALSE);
        }


        return "Thành công";
    }


    public String generatePass() {
        // Các ký tự để tạo mật khẩu
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < 9; i++) {
            int index = random.nextInt(chars.length());
            password.append(chars.charAt(index));
        }

        return password.toString();
    }


}
