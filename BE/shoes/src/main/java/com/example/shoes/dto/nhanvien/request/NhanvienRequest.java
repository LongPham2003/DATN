package com.example.shoes.dto.nhanvien.request;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
public class NhanvienRequest {


    private String hoTen;

    private String sdt;

    private String gioiTinh;

    private String email;


    @Enumerated(EnumType.STRING)
    private Roles roles;


    private Boolean trangThai;

    private TaiKhoan taiKhoan;
}
