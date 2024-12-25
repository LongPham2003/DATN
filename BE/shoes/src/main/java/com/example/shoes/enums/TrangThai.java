package com.example.shoes.enums;

public enum TrangThai {
    TRA_HANG("trả hàng"),
    HOAN_TRA("hoàn trả "),
    CHO_XAC_NHAN("Chờ Xác Nhận"),
    DA_XAC_NHAN("Đã xác nhận đơn"), // nv đã xác nhận chờ đơn vị vận chuyển
    CHO_LAY_HANG("Chờ lấy hàng"),
    CHO_GIAO_HANG("Chờ đơn vị vẫn chuyển"),
    DANG_GIAO("Đơn đang trên đường giao hàng"),
    XAC_NHAN_THANH_TOAN("Chờ xác nhận thanh toán"),
    DA_THANH_TOAN("Đã thanh toán"), //
    HOAN_THANH("Hoàn thành"),
    HUY_DON("Hủy đơn"),
    HOAN_HANG("Hoàn hàng"),
    HOAN_HANG_THANH_CONG("Hoàn hàng thành công");


    private final String moTa;

    TrangThai(String moTa) {
        this.moTa = moTa;
    }

    public String getMoTa() {
        return moTa;
    }
}
