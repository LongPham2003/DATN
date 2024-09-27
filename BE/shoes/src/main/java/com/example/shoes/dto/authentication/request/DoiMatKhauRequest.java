package com.example.shoes.dto.authentication.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoiMatKhauRequest {
    private String email;
    private String password;
    private String newPassword;
}
