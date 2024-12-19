package com.example.shoes.dto.hoadon.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
//@AllArgsConstructor
//@NoArgsConstructor
public class GhiChu {
    @NotBlank(message = "Không được để trống")
    String ghiChu;
}
