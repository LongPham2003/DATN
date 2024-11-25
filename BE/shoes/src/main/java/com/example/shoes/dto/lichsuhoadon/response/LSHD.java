package com.example.shoes.dto.lichsuhoadon.response;

import com.example.shoes.enums.TrangThai;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface LSHD {
     Integer getId();
     Integer getIdHoaDon();
     String getMoTa();
     LocalDate getThoiGian();
     String getNguoiThucHien();
     TrangThai getTrangThai();
     LocalDateTime getCreateAt();
     String getCreateBy();
}
