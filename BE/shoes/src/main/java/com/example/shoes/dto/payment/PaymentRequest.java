package com.example.shoes.dto.payment;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentRequest {
    private String phuongThucThanhToan;
    private BigDecimal tienKhachDua;
}
