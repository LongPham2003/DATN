package com.example.shoes.dto.hoadon.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GhiChu {
    @NotBlank(message = "Không được để trống")
    String ghiChu;
}
