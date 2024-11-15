package com.example.shoes.dto.kichthuoc.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class KichThuocRequest {
    @NotBlank(message = "Tên không được để trống")
    private String kichThuoc;
    private Boolean trangThai;
}
