package com.example.shoes.dto.hoadon.response;

import com.example.shoes.enums.TrangThai;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter


public class HoaDonResponse {
    private Integer id;
    private String ma;
    private String tenNhanVien;
    private String tenKhachHang;
    private String soDienThoai;
    private String diaChiGiaoHang;
    private String tongTien;
    private String tienDuocGiam;
    private String tienPhaiThanhToan;
    private String tienKhachDua;
    private String tienThua;
    private String phuongThucThanhToan;
    private String phuongThucGiaoHang;
<<<<<<< HEAD
    private LocalDate ngayTao;
    private String trangThaiDonHang;
    private Boolean trangThaiThanhToan;

=======
    private LocalDateTime ngayTao;
    private String trangThai;
    private String tienShip;
>>>>>>> 5d4b65c6f80ee4f3f5e90e99aad941f1a95c9d01
}



