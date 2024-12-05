package com.example.shoes.controller;


import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamBanChayResponse;
import com.example.shoes.dto.sanpham.response.SanPhamClient;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.entity.SanPham;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.repository.SanPhamRepo;
import com.example.shoes.service.SanPhamService;
import com.example.shoes.spec.SanPhamSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;
    @Autowired
    private SanPhamRepo sanPhamRepo;

    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<SanPhamResponse>> getAllSanPham(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "idLoai", required = false) Integer idLoai,
            @RequestParam(value = "trangThai", required = false) Boolean trangThai,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<SanPhamResponse> sanPhamPhanTrangResponse = sanPhamService.getSanPham(pageNumber, pageSize, keyword, idLoai, trangThai);
        return ApiResponse.<PhanTrangResponse<SanPhamResponse>>builder()
                .result(sanPhamPhanTrangResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SanPhamResponse> getById(@PathVariable Integer id) {
        SanPhamResponse sanPhamResponse = sanPhamService.getById(id);
        return ApiResponse.<SanPhamResponse>builder()
                .result(sanPhamResponse)
                .build();
    }

    @GetMapping("/ten")
    public ResponseEntity<List<String>> getAllTen() {
        List<String> listTen = sanPhamService.getAlltenSP();
        return ResponseEntity.ok(listTen);
    }

    @PostMapping("/add")
    public ApiResponse<SanPhamResponse> create(@RequestBody SanPhamRequest request) {
        SanPhamResponse sanPhamResponse = sanPhamService.create(request);
        return ApiResponse.<SanPhamResponse>builder()
                .result(sanPhamResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SanPhamResponse> update(@PathVariable Integer id, @RequestBody SanPhamRequest request) {
        SanPhamResponse updated = sanPhamService.update(id, request);
        return ApiResponse.<SanPhamResponse>builder()
                .result(updated)
                .build();
    }

    @GetMapping("/getall")
    public ApiResponse<List<SanPhamResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<SanPhamResponse> list = sanPhamService.getAll();

        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<SanPhamResponse>>builder()
                .result(list)
                .build();
    }

    @PutMapping("/updatetrangthai/{id}")
    public ApiResponse<Void> updateTrangThai(@PathVariable Integer id) {
        sanPhamService.updateTheoTrangThai(id);
        return ApiResponse.<Void>builder()
                .message("Update thành công")
                .build();
    }

    @GetMapping("/top3-ban-chay")
    public ApiResponse<List<SanPhamBanChayResponse>> getTop3SanPhamBanChay() {
        // Lấy danh sách sản phẩm
        List<SanPhamBanChayResponse> top3SanPham = sanPhamService.getTop3SanPhamBanChay();
        // Trả về response với ApiResponse
        return ApiResponse.<List<SanPhamBanChayResponse>>builder()
                .result(top3SanPham)
                .build();
    }

    @GetMapping("/trang")
    public List<SanPhamClient> sanPhamClient(
            @RequestParam(value = "tenSP", required = false) String tenSP,
            @RequestParam(value = "idLoai", required = false) List<Integer> idLoai,
            @RequestParam(value = "idKichThuoc", required = false) List<Integer> idKichThuoc,
            @RequestParam(value = "idMauSac", required = false) List<Integer> idMauSac,
            @RequestParam(value = "idDeGiay", required = false) List<Integer> idDeGiay,
            @RequestParam(value = "idChatLieu", required = false) List<Integer> idChatLieu,
            @RequestParam(value = "idThuongHieu", required = false) List<Integer> idThuongHieu,
            @RequestParam(value = "donGiaMin", required = false) BigDecimal donGiaMin,
            @RequestParam(value = "donGiaMax", required = false) BigDecimal donGiaMax) {

        return sanPhamService.sanPhamClient(tenSP, idLoai, idKichThuoc, idMauSac, idDeGiay, idChatLieu, idThuongHieu, donGiaMin, donGiaMax);
    }

    @GetMapping("/SPClient")
    public SanPhamClient sanPhamTrangChiTietClient(@RequestParam(value = "idSP") Integer idSP) {
        return sanPhamService.sanPhamTrangChiTietClient(idSP);
    }

    @GetMapping("/trangchu")
    public PhanTrangResponse<SanPhamResponse> getFilteredProducts(
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(value = "tenSP", required = false) String tenSP,
            @RequestParam(value = "idLoai", required = false) List<Integer> idLoai,
            @RequestParam(value = "idKichThuoc", required = false) List<Integer> idKichThuoc,
            @RequestParam(value = "idMauSac", required = false) List<Integer> idMauSac,
            @RequestParam(value = "idDeGiay", required = false) List<Integer> idDeGiay,
            @RequestParam(value = "idChatLieu", required = false) List<Integer> idChatLieu,
            @RequestParam(value = "idThuongHieu", required = false) List<Integer> idThuongHieu,
            @RequestParam(value = "donGiaMin", defaultValue = "0.00") BigDecimal donGiaMin,
            @RequestParam(value = "donGiaMax",  defaultValue = "9999999999.00") BigDecimal donGiaMax) {
        {

            Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

            // Tạo Specification kết hợp cả lọc theo Loại và Thương Hiệu
            Specification<SanPham> spec = SanPhamSpec.filterByLoaiAndThuongHieu(tenSP, idLoai, idKichThuoc, idMauSac, idDeGiay, idChatLieu, idThuongHieu, donGiaMin, donGiaMax);

            Page<SanPham> pageResult = sanPhamRepo.findAll(spec, pageable);

            // Lấy các sản phẩm thỏa mãn điều kiện lọc
            List<SanPhamResponse> sanPhamResponses = new ArrayList<>();

            for (SanPham sanPham : pageResult.getContent()) {
                SanPhamResponse response = new SanPhamResponse();
                response.setId(sanPham.getId());
                response.setIdLoai(sanPham.getLoai() != null ? sanPham.getLoai().getId() : null);// Tránh lỗi null pointer
                // lay ten loai cho de hieu
                response.setTenLoai(sanPham.getLoai().getTen());
                response.setMa(sanPham.getMa());
                response.setTenSanPham(sanPham.getTenSanPham());
                response.setNgayTao(sanPham.getNgayTao());
                response.setMoTa(sanPham.getMoTa());
                response.setDonGia(sanPham.getSanPhamChiTiet().get(0).getDonGia());
                response.setIdSpct(sanPham.getSanPhamChiTiet().get(0).getId());
                response.setTrangThai(sanPham.getTrangThai());
                sanPhamResponses.add(response); // Thêm đối tượng vào danh sách kết quả
            }
            // Tạo đối tượng phân trang Response và trả về
            PhanTrangResponse<SanPhamResponse> phanTrangResponse = new PhanTrangResponse<>();
            phanTrangResponse.setPageNumber(pageResult.getNumber() + 1);
            phanTrangResponse.setPageSize(pageResult.getSize());
            phanTrangResponse.setTotalElements(pageResult.getTotalElements());
            phanTrangResponse.setTotalPages(pageResult.getTotalPages());
            phanTrangResponse.setResult(sanPhamResponses);

            return phanTrangResponse;
        }

    }
}
