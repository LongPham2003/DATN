package com.example.shoes.enums;

public enum TrangThai {
    CHUA_THANH_TOAN("Chưa thanh toán"),
    CHO_XAC_NHAN_DON("Chờ xác nhận đơn"),
    DA_XAC_NHAN_DON("Đã xác nhận đơn"),
    DA_THANH_TOAN("Đã thanh toán"),
    TAO_MOI("Đơn vừa được tạo bởi khách hàng"),
    DANG_GIAO("Đơn đang trên đường giao hàng  "),
    GIAO_THANH_CONG("Đơn hàng đã được giao hàng thành công "),
    HUY_DON("Hủy đơn");

    private final String moTa;

    TrangThai(String moTa) {
        this.moTa = moTa;
    }

    public String getMoTa() {
        return moTa;
    }
}
