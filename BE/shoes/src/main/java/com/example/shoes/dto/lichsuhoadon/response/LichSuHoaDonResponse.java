package com.example.shoes.dto.lichsuhoadon.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class LichSuHoaDonResponse {
    private Integer id;
    private Integer idHoaDon;
    private String moTa;
    private LocalDate thoiGian;
    private String nguoiThucHien;
}
