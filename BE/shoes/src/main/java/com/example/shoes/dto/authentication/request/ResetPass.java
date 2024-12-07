package com.example.shoes.dto.authentication.request;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResetPass {
    @Email(message = "Không đúng định dạng email")
    String email;
}
