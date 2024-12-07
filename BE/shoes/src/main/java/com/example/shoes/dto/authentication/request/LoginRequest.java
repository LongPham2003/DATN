package com.example.shoes.dto.authentication.request;

import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginRequest {
    @Email(message = "Email chưa đúng định dạng hoặc chưa tồn tại")
    String email;
    String password;
}
