package com.example.shoes.dto.vnpay.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionStatus {
    private String status;
    private String message;
    private String data;
}
