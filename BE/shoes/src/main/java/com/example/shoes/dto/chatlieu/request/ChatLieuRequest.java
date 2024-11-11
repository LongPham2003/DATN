package com.example.shoes.dto.chatlieu.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatLieuRequest {

    @NotBlank(message = "Tên không được để trống")
    private String ten;
    @NotNull
    private Boolean trangThai;
}
