package com.example.shoes.dto.nhanvien.request;

import com.example.shoes.entity.TaiKhoan;
import com.example.shoes.enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NhanVienUpdateRequest {
    private String hoTen;

    private String sdt;

    private String gioiTinh;

    private String email;

    private String diaChi;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Enumerated(EnumType.STRING)
    private Roles roles;

    private  String matKhau;

    private Boolean trangThai;

    private TaiKhoan taiKhoan;
}
