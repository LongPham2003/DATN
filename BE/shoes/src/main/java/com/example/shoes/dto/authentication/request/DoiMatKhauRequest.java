package com.example.shoes.dto.authentication.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoiMatKhauRequest {
    String email;
    String password;
    String newPassword;
}
