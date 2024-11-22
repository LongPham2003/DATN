package com.example.shoes.dto.lichsuhoadon.response;

import com.example.shoes.enums.TrangThai;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LichSuHoaDonResponse {
    private Integer id;
    private Integer idHoaDon;
    private String moTa;
    private LocalDate thoiGian;
    private String nguoiThucHien;
    private TrangThai trangThai;
    private LocalDateTime createdAt;
    private String createdBy;


}
