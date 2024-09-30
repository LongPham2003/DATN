package com.example.shoes.dto.chatlieu.request;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatLieuRequest {

    @NotNull
    private String ten;
    @NotNull
    private Boolean trangThai;
}
