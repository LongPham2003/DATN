package com.example.shoes.controller;

import com.example.shoes.dto.authentication.request.SignUpRequest;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.exception.AppException;
import com.example.shoes.service.AuthenticationService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/signup")
    public ApiResponse<String> signup(@Valid @RequestBody SignUpRequest request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }
       return ApiResponse.<String>builder()
               .result(authenticationService.signUp(request)).build();
    }

}
