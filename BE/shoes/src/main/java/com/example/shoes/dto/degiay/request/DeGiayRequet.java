package com.example.shoes.dto.degiay.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DeGiayRequet {
    @NotBlank(message = "Tên không được để trống")
    private String ten;
    private Boolean trangThai;
}
