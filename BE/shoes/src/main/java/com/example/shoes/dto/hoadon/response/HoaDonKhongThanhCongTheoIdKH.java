package com.example.shoes.dto.hoadon.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public interface HoaDonKhongThanhCongTheoIdKH {
    Integer getIdHoaDon();          // alias: idHoaDon
    String getMaHoaDon();          // alias: maHoaDon
    @JsonFormat(pattern = "dd-MM-yyyy")
    Date getNgayDatHang();
    String getDiaChiGiaoHang();    // alias: diaChiGiaoHang
    @JsonFormat(pattern = "dd-MM-yyyy")
    Date getNgayGiaoHang();        // alias: ngayGiaoHang
    Float getPhiVanChuyen();       // alias: phiVanChuyen
    String getPhuongThucThanhToan(); // alias: phuongThucThanhToan
    String getMaGiamGia();         // alias: maGiamGia
    Float getTongTienHang();       // alias: tongTienHang
    Float getTienDuocGiam();       // alias: tienDuocGiam
    Float getTienPhaiThanhToan();  // alias: tienPhaiThanhToan
    String getTrangThaiDonHang();  // alias: trangThaiDonHang
    Boolean getTrangThaiThanhToan(); // alias: trangThaiThanhToan
    Integer getTongSoSanPham();    // alias: tongSoSanPham
}
