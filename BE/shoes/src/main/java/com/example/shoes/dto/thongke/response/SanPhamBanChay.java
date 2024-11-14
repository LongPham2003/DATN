package com.example.shoes.dto.thongke.response;

import java.math.BigDecimal;

public interface SanPhamBanChay {
    Integer getIdSP();
    String getTenSanPham();
    String getTenLoai();
    Integer getIdSPCTBanChayNhat();
    String getTenThuongHieuBanChay();
    BigDecimal getGiaCaoNhat();
    BigDecimal getGiaThapNhat();
    Integer getTongSoLuongBanDuoc();

}
