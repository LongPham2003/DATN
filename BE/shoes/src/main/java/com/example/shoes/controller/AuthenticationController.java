package com.example.shoes.controller;

import com.example.shoes.dto.authentication.request.AuthenticationRequest;
import com.example.shoes.dto.authentication.request.IntrospectRequest;
import com.example.shoes.dto.authentication.response.AuthenticationResponse;
import com.example.shoes.dto.authentication.response.IntrospectResponse;
import com.example.shoes.dto.ApiResponse;
import com.example.shoes.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
     var result =   authenticationService.authenticate(authenticationRequest);
        return  ApiResponse.<AuthenticationResponse>builder()
                .result(result).build();

    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest introspectRequest) throws ParseException, JOSEException {

        var result = authenticationService.introspect(introspectRequest);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result).build();

    }
}
