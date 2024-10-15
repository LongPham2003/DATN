package com.example.shoes.dto.nhanvien.request;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
public class NhanvienAddRequest {


    private String hoTen;

    private String ma;

    private String sdt;

    private String gioiTinh;

    private String email;

    private String diaChi;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Enumerated(EnumType.STRING)
    private Roles roles;

    private  String matKhau;


    private TaiKhoan taiKhoan;
}
