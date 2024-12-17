package com.example.shoes.dto.hoadon.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class DatHangRequest {
    private BigDecimal phiVanChuyen;

    private String soDienThoai;

    private String tenKhachHang;

    private String tinhThanhPho;

    private String huyenQuan;

    private String xaPhuong;

    private Boolean diaChiMacDinh;

    private String soNhaDuongThonXom;

    private String diaChiChiTiet;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date ngayDuKien;

    private BigDecimal tienPhaiThanhToan;

}
