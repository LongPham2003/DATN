package com.example.shoes.dto.authentication.request;

import jakarta.validation.constraints.Size;
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
    @Size(min = 8,max = 50,message = "Mật khẩu lớn hơn 8 kí tự và nhỏ hơn 50 kí tự")
    private String newPassword;
}
