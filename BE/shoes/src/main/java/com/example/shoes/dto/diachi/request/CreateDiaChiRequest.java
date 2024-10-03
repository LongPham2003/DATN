package com.example.shoes.dto.diachi.request;

import com.example.shoes.entity.KhachHang;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDiaChiRequest {


    private String ten;

    private String sdt;

    private String tinhThanhPho;

    private String huyenQuan;

    private String xaPhuong;

    private Boolean diaChiMacDinh;

    private KhachHang khachHang;
}
