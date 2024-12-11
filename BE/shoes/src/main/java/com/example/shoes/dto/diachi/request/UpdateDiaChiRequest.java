package com.example.shoes.dto.diachi.request;

import com.example.shoes.entity.KhachHang;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateDiaChiRequest
{

    private Integer id;

    private String ten;

    private String sdt;

    @NotNull(message = "Tỉnh/Thành phố không được để trống")
    private String tinhThanhPho;

    @NotBlank(message = "Huyện/Quận không được để trống")
    private String huyenQuan;

    @NotBlank(message = "Xã/Phường không được để trống")
    private String xaPhuong;

    @NotBlank(message = "Số nhà không được để trống")
    private String soNhaDuongThonXom;

    private Boolean diaChiMacDinh;

    private KhachHang khachHang;
}
