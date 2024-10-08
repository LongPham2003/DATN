package com.example.shoes.specification;

import com.example.shoes.entity.SanPhamChiTiet;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;

public class SanPhamChiTietSpecification {

    public static Specification<SanPhamChiTiet> hasSanPham(String tenSanPham) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(tenSanPham) ?
                        criteriaBuilder.like(root.get("idSanPham").get("tenSanPham"), "%" + tenSanPham + "%") : null;
    }

    public static Specification<SanPhamChiTiet> hasChatLieu(String tenChatLieu) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(tenChatLieu) ?
                        criteriaBuilder.like(root.get("idChatLieu").get("ten"), "%" + tenChatLieu + "%") : null;
    }

    public static Specification<SanPhamChiTiet> hasMauSac(String tenMauSac) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(tenMauSac) ?
                        criteriaBuilder.like(root.get("idMauSac").get("ten"), "%" + tenMauSac + "%") : null;
    }

    public static Specification<SanPhamChiTiet> hasKichThuoc(String kichThuoc) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(kichThuoc) ?
                        criteriaBuilder.like(root.get("idKichThuoc").get("kichThuoc"), "%" + kichThuoc + "%") : null;
    }

    public static Specification<SanPhamChiTiet> hasThuongHieu(String tenThuongHieu) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(tenThuongHieu) ?
                        criteriaBuilder.like(root.get("idThuongHieu").get("ten"), "%" + tenThuongHieu + "%") : null;
    }

    public static Specification<SanPhamChiTiet> hasDeGiay(String tenDeGiay) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(tenDeGiay) ?
                        criteriaBuilder.like(root.get("idDeGiay").get("ten"), "%" + tenDeGiay + "%") : null;
    }

    public static Specification<SanPhamChiTiet> hasDonGia(BigDecimal donGia) {
        return (root, query, criteriaBuilder) ->
                donGia != null ? criteriaBuilder.equal(root.get("donGia"), donGia) : null;
    }

    public static Specification<SanPhamChiTiet> hasSoLuong(Integer soLuong) {
        return (root, query, criteriaBuilder) ->
                soLuong != null ? criteriaBuilder.equal(root.get("soLuong"), soLuong) : null;
    }

    public static Specification<SanPhamChiTiet> hasTrangThai(Boolean trangThai) {
        return (root, query, criteriaBuilder) ->
                trangThai != null ? criteriaBuilder.equal(root.get("trangThai"), trangThai) : null;
    }
}
