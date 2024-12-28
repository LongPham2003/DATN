package com.example.shoes.dto.hoadon.request;

import com.example.shoes.entity.PhieuGiamGia;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class HoaDonUpdateAdmin
{
    private String soDienThoai;
    private String diaChiGiaoHang;
    private BigDecimal phiVanChuyen;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date ngayDuKien;
    private String tenKhachHang;
}
