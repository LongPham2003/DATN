package com.example.shoes.dto.khachhang.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter

public class KhachHangResponse {

    private Integer id;

    private String hoTen;

    private String sdt;

    private String email;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    private String diaChiMacDinh;

    private String gioiTinh;

    private Boolean trangThai ;
}
