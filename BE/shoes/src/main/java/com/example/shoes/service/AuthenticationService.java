package com.example.shoes.service;

import com.example.shoes.dto.authentication.request.AuthenticationRequest;

public interface AuthenticationService {
    boolean authenticate(AuthenticationRequest authenticationRequest);
}
