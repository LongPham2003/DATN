package com.example.shoes.dto.taikhoan.response;

import com.example.shoes.entity.KhachHang;
import com.example.shoes.entity.NhanVien;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanResponse {

    private Integer id;

    private String tenDangNhap;

    private String email;


    private String chucVu;
}