package com.example.shoes.service;

import com.example.shoes.dto.authentication.request.DoiMatKhauRequest;
import com.example.shoes.dto.authentication.request.LoginRequest;
import com.example.shoes.dto.authentication.request.ResetPass;
import com.example.shoes.dto.authentication.request.SignUpRequest;
import com.example.shoes.entity.TaiKhoan;

public interface AuthenticationService {
    String signUp(SignUpRequest signUpRequest);

    TaiKhoan singIn(LoginRequest loginRequest);

    String resetPass(ResetPass resetPass);

    String doiMatKhau(DoiMatKhauRequest doiMatKhauRequest);
}
