package com.example.shoes.dto.khachhang.request;

import jakarta.persistence.*;
import lombok.*;


import java.util.Date;

@Getter
@Setter
@Builder
public class KhachHangRequest {

    private Integer id;

    private String hoTen;

    private String sdt;

    private String email;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;


    private String gioiTinh;

    private String matKhau;

    private Boolean trangThai;

    private String huyenQuan;
    private String tinhThanhPho;
    private String xaPhuong;
    private  String diaChiChiTiet;


}
