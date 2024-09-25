package com.example.shoes.dto.authentication.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginRequest {
    String email;
    String password;
}
