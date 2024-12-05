package com.example.shoes.spec;

import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class SanPhamSpec {

    // lọc theo tên
    public static Specification<SanPham> hasTenSanPham(String tenSanPham) {
        return (root, query, criteriaBuilder) -> {
            if (tenSanPham == null || tenSanPham.trim().isEmpty()) {
                return null; // Không áp dụng bộ lọc nếu tên sản phẩm rỗng
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("tenSanPham")), // Chuyển tên sản phẩm về chữ thường
                    "%" + tenSanPham.toLowerCase() + "%" // Tìm kiếm tương tự (chứa chuỗi)
            );
        };
    }

    // Lọc theo loại sản phẩm
    public static Specification<SanPham> hasLoai(List<Integer> loai) {
        return (root, query, criteriaBuilder) -> {
            if (loai != null && !loai.isEmpty()) {
                return root.get("loai").get("id").in(loai);
            }
            return criteriaBuilder.conjunction();
        };
    }

    // Lọc theo thương hiệu
    public static Specification<SanPham> hasThuongHieu(List<Integer> thuongHieu) {
        return (root, query, criteriaBuilder) -> {
            if (thuongHieu != null && !thuongHieu.isEmpty()) {
                return root.join("sanPhamChiTiet") // Join với bảng chi tiết sản phẩm
                        .get("idThuongHieu").get("id").in(thuongHieu); // Lọc theo idThuongHieu trong bảng san_pham_chi_tiet
            }
            return criteriaBuilder.conjunction();
        };
    }

    // Lọc theo đế giày
    public static Specification<SanPham> hasDeGiay(List<Integer> deGiay) {
        return (root, query, criteriaBuilder) -> {
            if (deGiay != null && !deGiay.isEmpty()) {
                return root.join("sanPhamChiTiet") // Join với bảng chi tiết sản phẩm
                        .get("idDeGiay").get("id").in(deGiay); // Lọc theo idThuongHieu trong bảng san_pham_chi_tiet
            }
            return criteriaBuilder.conjunction();
        };
    }

    // Lọc theo chất liệu
    public static Specification<SanPham> hasChatLieu(List<Integer> chatLieu) {
        return (root, query, criteriaBuilder) -> {
            if (chatLieu != null && !chatLieu.isEmpty()) {
                return root.join("sanPhamChiTiet") // Join với bảng chi tiết sản phẩm
                        .get("idChatLieu").get("id").in(chatLieu); // Lọc theo idThuongHieu trong bảng san_pham_chi_tiet
            }
            return criteriaBuilder.conjunction();
        };
    }

    // Lọc theo màu sắc
    public static Specification<SanPham> hasMauSac(List<Integer> mauSac) {
        return (root, query, criteriaBuilder) -> {
            if (mauSac != null && !mauSac.isEmpty()) {
                return root.join("sanPhamChiTiet") // Join với bảng chi tiết sản phẩm
                        .get("idMauSac").get("id").in(mauSac); // Lọc theo idThuongHieu trong bảng san_pham_chi_tiet
            }
            return criteriaBuilder.conjunction();
        };
    }

    // Lọc theo kích thước
    public static Specification<SanPham> hasKichThuoc(List<Integer> kichThuoc) {
        return (root, query, criteriaBuilder) -> {
            if (kichThuoc != null && !kichThuoc.isEmpty()) {
                return root.join("sanPhamChiTiet") // Join với bảng chi tiết sản phẩm
                        .get("idKichThuoc").get("id").in(kichThuoc); // Lọc theo idThuongHieu trong bảng san_pham_chi_tiet
            }
            return criteriaBuilder.conjunction();
        };
    }

    // lọc theo khoảng giá
    public static Specification<SanPham> hasGiaTrongKhoang(BigDecimal minGia, BigDecimal maxGia) {
        return (root, query, criteriaBuilder) -> {
            // Join với bảng SanPhamChiTiet để lấy thông tin giá từ bảng này
            Join<SanPham, SanPhamChiTiet> sanPhamChiTiet = root.join("sanPhamChiTiet");

            // Nếu cả minGia và maxGia đều null, không áp dụng bộ lọc
            if (minGia == null && maxGia == null) {
                return null;
            }
            // Log giá trị giá sản phẩm đang được lọc
            if (minGia != null && maxGia != null) {
                return criteriaBuilder.between(sanPhamChiTiet.get("donGia"), minGia, maxGia);
            }

            // Nếu chỉ có minGia, lọc các sản phẩm có giá lớn hơn hoặc bằng minGia
            if (minGia != null) {
                return criteriaBuilder.greaterThanOrEqualTo(sanPhamChiTiet.get("donGia"), minGia);
            }

            // Nếu chỉ có maxGia, lọc các sản phẩm có giá nhỏ hơn hoặc bằng maxGia
            return criteriaBuilder.lessThanOrEqualTo(sanPhamChiTiet.get("donGia"), maxGia);
        };
    }

    // Kết hợp cả hai lọc theo Loại và Thương Hiệu
    public static Specification<SanPham> filterByLoaiAndThuongHieu(
            String ten, List<Integer> loai, List<Integer> thuongHieu
            , List<Integer> deGiay, List<Integer> chatLieu, List<Integer> mauSac
            , List<Integer> kichThuoc, BigDecimal minGia, BigDecimal maxGia) {
        System.out.println("Filtering by price range: " + minGia + " to " + maxGia); // Thêm log để kiểm tra
        Specification<SanPham> spec = Specification.where(hasTenSanPham(ten))
                .and(hasLoai(loai))
                .and(hasThuongHieu(thuongHieu))
                .and(hasChatLieu(chatLieu))
                .and(hasMauSac(mauSac))
                .and(hasKichThuoc(kichThuoc))
                .and(hasDeGiay(deGiay))
                .and(hasGiaTrongKhoang(minGia, maxGia));

        return spec;
    }

}
