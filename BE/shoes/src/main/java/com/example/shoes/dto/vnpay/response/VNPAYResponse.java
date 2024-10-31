package com.example.shoes.dto.vnpay.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


    @Getter
    @Setter
    public class VNPAYResponse implements Serializable {
        private String status;
        private String message;
        private String URL;
}
