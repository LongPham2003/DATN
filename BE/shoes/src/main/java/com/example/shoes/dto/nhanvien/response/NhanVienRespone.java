package com.example.shoes.dto.nhanvien.response;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NhanVienRespone {

    private String hoTen;

    private String sdt;

    private String gioiTinh;

    private String email;


    @Enumerated(EnumType.STRING)
    private Roles roles;


    private Boolean trangThai;

    private TaiKhoan taiKhoan;
}
