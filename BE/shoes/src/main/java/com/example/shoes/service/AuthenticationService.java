package com.example.shoes.service;

import com.example.shoes.dto.authentication.request.AuthenticationRequest;
import com.example.shoes.dto.authentication.request.IntrospectRequest;
import com.example.shoes.dto.authentication.response.AuthenticationResponse;
import com.example.shoes.dto.authentication.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    // kiểm tra xem pass user đúng không
    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

    // kiểm tra xem token hợp lệ hay không
    IntrospectResponse introspect(IntrospectRequest token) throws JOSEException, ParseException;
}
