package com.example.shoes.dto.khachhang.request;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Builder
public class KhachHangRequest {


    private String hoTen;

    private String sdt;

    private String email;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    private String diaChiMacDinh;

    private String gioiTinh;


    private Boolean trangThai;

}
