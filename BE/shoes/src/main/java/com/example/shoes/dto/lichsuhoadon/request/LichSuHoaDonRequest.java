package com.example.shoes.dto.lichsuhoadon.request;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;

@Setter
@Getter
public class LichSuHoaDonRequest {
    private Integer idHoaDon;
    private String moTa;
    private LocalDate thoiGian;
    private String nguoiThucHien;
}
