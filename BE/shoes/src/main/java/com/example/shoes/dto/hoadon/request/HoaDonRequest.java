package com.example.shoes.dto.hoadon.request;

import com.example.shoes.dto.hoadonchitiet.request.HoaDonChiTietRequest;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
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
