package com.example.shoes.dto.hoadon.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class XacNhanThanhToan {
    private BigDecimal tienKhachDua;
    private String phuongThucThanhToan;
    private BigDecimal tienPhaiThanhToan;
    private String moTa;
}
