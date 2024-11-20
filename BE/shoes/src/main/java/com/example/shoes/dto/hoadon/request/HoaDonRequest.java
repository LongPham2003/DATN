package com.example.shoes.dto.hoadon.request;

import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter

public class HoaDonRequest {
    private Integer idNhanVien;
    private String ma;
    private Integer idKhachHang;
    private Integer idPhieuGiamGia;
    private String sdt;
    private BigDecimal tienKhachDua;
    private String diaChiGiaoHang;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;
    private List<HoaDonChiTietRequest> chiTietSanPhams = new ArrayList<>(); // Khởi tạo danh sách rỗng

}
