package com.example.shoes.service;

import com.example.shoes.dto.authentication.request.SignUpRequest;

public interface AuthenticationService {
String signUp(SignUpRequest signUpRequest);
}
