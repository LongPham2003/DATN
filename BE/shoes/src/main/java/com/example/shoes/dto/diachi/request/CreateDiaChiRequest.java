package com.example.shoes.dto.diachi.request;

import com.example.shoes.entity.KhachHang;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDiaChiRequest {




    private String tinhThanhPho;

    private String huyenQuan;

    private String xaPhuong;

    private Boolean diaChiMacDinh;

    private String soNhaDuongThonXom;

    private String   diaChiChiTiet;

    private KhachHang khachHang;
}
