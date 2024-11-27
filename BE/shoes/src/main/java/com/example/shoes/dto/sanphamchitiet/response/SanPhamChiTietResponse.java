package com.example.shoes.dto.sanphamchitiet.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
public class SanPhamChiTietResponse {
    private Integer id;
    private String ma;
    private Integer idSanPham;
    private String tenSanPham;
    private String chatLieu;
    private String mauSac;
    private String kichThuoc;
    private String thuongHieu;
    private String deGiay;
    private String donGia;
    private Integer soLuong;
    private Boolean trangThai;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayTao;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayCapNhat;
}
