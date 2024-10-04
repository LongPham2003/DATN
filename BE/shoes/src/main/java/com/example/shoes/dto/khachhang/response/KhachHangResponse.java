package com.example.shoes.dto.khachhang.response;

import com.example.shoes.entity.DiaChi;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter

public class KhachHangResponse {

    private Integer id;

    private String hoTen;

    private String sdt;

    private String email;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    private List<DiaChi> diaChi;

    private String gioiTinh;

    private Boolean trangThai ;
}
