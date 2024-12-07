package com.example.shoes.dto.sanpham.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class LocSanPham
{
    String tenSP;
    List<Integer> idLoai;
    List<Integer> idKichThuoc;
    List<Integer> idMauSac;
    List<Integer> idDeGiay;
    List<Integer> idChatLieu;
    List<Integer> idThuongHieu;
    BigDecimal donGiaMin;
    BigDecimal donGiaMax;
}
