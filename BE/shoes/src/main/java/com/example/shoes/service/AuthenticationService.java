package com.example.shoes.service;

import com.example.shoes.dto.authentication.request.LoginRequest;
import com.example.shoes.dto.authentication.request.ResetPass;
import com.example.shoes.dto.authentication.request.SignUpRequest;

public interface AuthenticationService {
    String signUp(SignUpRequest signUpRequest);

    boolean singIn(LoginRequest loginRequest);

    String resetPass(ResetPass resetPass);

}
