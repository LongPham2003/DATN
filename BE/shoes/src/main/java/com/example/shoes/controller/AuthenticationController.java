package com.example.shoes.controller;

import com.example.shoes.dto.authentication.request.DoiMatKhauRequest;
import com.example.shoes.dto.authentication.request.LoginRequest;
import com.example.shoes.dto.authentication.request.ResetPass;
import com.example.shoes.dto.authentication.request.SignUpRequest;
import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.AuthenticationService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ApiResponse<String> signup(@Valid @RequestBody SignUpRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
        return ApiResponse.<String>builder()
                .result(authenticationService.signUp(request)).build();
    }

    @PostMapping("/login")
    public ApiResponse<TaiKhoan> login(@RequestBody LoginRequest loginRequest) {
        return ApiResponse.<TaiKhoan>builder()
                .result(authenticationService.singIn(loginRequest)).build();
    }

    @PostMapping("/resetpass")
    public ApiResponse<String> resetpass(@RequestBody ResetPass resetPass) {
        return ApiResponse.<String>builder()
                .result(authenticationService.resetPass(resetPass)).build();
    }

    @PostMapping("/doimatkhau")
    public ApiResponse<String> doiMatKhau(@RequestBody DoiMatKhauRequest request) {
        return ApiResponse.<String>builder()
                .result(authenticationService.doiMatKhau(request)).build();
    }

}
