package com.example.shoes.dto.vnpay.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class VNPAYResponse implements Serializable {
    private String vnp_ResponseCode;
    private String vnp_Message;

    // Getters and setters
    public String getVnp_ResponseCode() {
        return vnp_ResponseCode;
    }

    public void setVnp_ResponseCode(String vnp_ResponseCode) {
        this.vnp_ResponseCode = vnp_ResponseCode;
    }

    public String getVnp_Message() {
        return vnp_Message;
    }

    public void setVnp_Message(String vnp_Message) {
        this.vnp_Message = vnp_Message;
    }
}
