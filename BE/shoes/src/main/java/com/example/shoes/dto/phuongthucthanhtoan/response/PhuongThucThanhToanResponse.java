package com.example.shoes.dto.phuongthucthanhtoan.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PhuongThucThanhToanResponse {
    private Integer id;
    private Integer idHoaDon;
    private String tenPhuongThuc;
    private String ghiChu;
}
