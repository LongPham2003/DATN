package com.example.shoes.dto.sanphamchitiet.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamChiTietDetailResponse {

    private Integer idSanPham;
    private Integer idChatLieu;
    private Integer idMauSac;
    private Integer idKichThuoc;
    private Integer idThuongHieu;
    private Integer idDeGiay;
    private BigDecimal donGia;
    private Integer soLuong;
    private Boolean trangThai;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayTao;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ngayCapNhat;
}
