package com.example.shoes.enums;

public enum TrangThai {
    CHUA_THANH_TOAN("Chưa thanh toán"),
    CHO_XAC_NHAN_DON("Chờ xác nhận đơn"),// đơn hàng mới được tạo
    DA_XAC_NHAN_DON("Đã xác nhận đơn"),// nv đã xác nhận chờ đơn vị vận chuyển
    CHO_DVVC("Chờ đơn vị vẫn chuyển"),
    XAC_NHAN_THANH_TOAN("Chờ xác nhận thanh toán"),
    DA_THANH_TOAN("Đã thanh toán"),//
    HUY_DON("Hủy đơn");

    private final String moTa;

    TrangThai(String moTa) {
        this.moTa = moTa;
    }

    public String getMoTa() {
        return moTa;
    }
}
