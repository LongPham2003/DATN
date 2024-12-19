package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.request.LocSanPham;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController
{
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
    )
    {
        PhanTrangResponse<SanPhamResponse> sanPhamPhanTrangResponse = sanPhamService.getSanPham(pageNumber, pageSize,
                keyword, idLoai, trangThai);
        return ApiResponse.<PhanTrangResponse<SanPhamResponse>>builder()
                .result(sanPhamPhanTrangResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SanPhamResponse> getById(@PathVariable Integer id)
    {
        SanPhamResponse sanPhamResponse = sanPhamService.getById(id);
        return ApiResponse.<SanPhamResponse>builder()
                .result(sanPhamResponse)
                .build();
    }

    @GetMapping("/ten")
    public ResponseEntity<List<String>> getAllTen()
    {
        List<String> listTen = sanPhamService.getAlltenSP();
        return ResponseEntity.ok(listTen);
    }

    @PostMapping("/add")
    public ApiResponse<SanPhamResponse> create(@RequestBody SanPhamRequest request)
    {
        SanPhamResponse sanPhamResponse = sanPhamService.create(request);
        return ApiResponse.<SanPhamResponse>builder()
                .result(sanPhamResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SanPhamResponse> update(@PathVariable Integer id, @RequestBody SanPhamRequest request)
    {
        SanPhamResponse updated = sanPhamService.update(id, request);
        return ApiResponse.<SanPhamResponse>builder()
                .result(updated)
                .build();
    }

    @GetMapping("/getall")
    public ApiResponse<List<SanPhamResponse>> getAll()
    {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<SanPhamResponse> list = sanPhamService.getAll();

        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<SanPhamResponse>>builder()
                .result(list)
                .build();
    }

    @PutMapping("/updatetrangthai/{id}")
    public ApiResponse<Void> updateTrangThai(@PathVariable Integer id)
    {
        sanPhamService.updateTheoTrangThai(id);
        return ApiResponse.<Void>builder()
                .message("Update thành công")
                .build();
    }

    @GetMapping("/top3-ban-chay")
    public ApiResponse<List<SanPhamBanChayResponse>> getTop3SanPhamBanChay()
    {
        // Lấy danh sách sản phẩm
        List<SanPhamBanChayResponse> top3SanPham = sanPhamService.getTop3SanPhamBanChay();
        // Trả về response với ApiResponse
        return ApiResponse.<List<SanPhamBanChayResponse>>builder()
                .result(top3SanPham)
                .build();
    }

    @GetMapping("/trangchu")
    public PhanTrangResponse<SanPhamClient> sanPhamClient(
            @RequestParam(value = "tenSP", required = false) String tenSP,
            @RequestParam(value = "idLoai", required = false) List<Integer> idLoai,
            @RequestParam(value = "idKichThuoc", required = false) List<Integer> idKichThuoc,
            @RequestParam(value = "idMauSac", required = false) List<Integer> idMauSac,
            @RequestParam(value = "idDeGiay", required = false) List<Integer> idDeGiay,
            @RequestParam(value = "idChatLieu", required = false) List<Integer> idChatLieu,
            @RequestParam(value = "idThuongHieu", required = false) List<Integer> idThuongHieu,
            @RequestParam(value = "donGiaMin", required = false) BigDecimal donGiaMin,
            @RequestParam(value = "donGiaMax", required = false) BigDecimal donGiaMax,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "12") int pageSize)
    {

        return sanPhamService.sanPhamClient(tenSP, idLoai, idKichThuoc, idMauSac, idDeGiay, idChatLieu, idThuongHieu,
                donGiaMin, donGiaMax,pageNumber,pageSize);
    }

    @GetMapping("/SPClient")
    public SanPhamClient sanPhamTrangChiTietClient(@RequestParam(value = "idSP") Integer idSP)
    {
        return sanPhamService.sanPhamTrangChiTietClient(idSP);
    }

    @GetMapping("/trang")
    public PhanTrangResponse<SanPhamResponse> getFilteredProducts(
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "3") int pageSize,
            @RequestParam(value = "tenSP", required = false) String tenSP,
            @RequestParam(value = "idLoai", required = false) List<Integer> idLoai,
            @RequestParam(value = "idKichThuoc", required = false) List<Integer> idKichThuoc,
            @RequestParam(value = "idMauSac", required = false) List<Integer> idMauSac,
            @RequestParam(value = "idDeGiay", required = false) List<Integer> idDeGiay,
            @RequestParam(value = "idChatLieu", required = false) List<Integer> idChatLieu,
            @RequestParam(value = "idThuongHieu", required = false) List<Integer> idThuongHieu,
            @RequestParam(value = "donGiaMin", required = false) BigDecimal donGiaMin,
            @RequestParam(value = "donGiaMax", required = false) BigDecimal donGiaMax)
    {
        {
           return sanPhamService.finAll(pageNumber,pageSize,tenSP
                   ,idLoai,idKichThuoc,idMauSac,idDeGiay,idChatLieu,idThuongHieu,donGiaMin,donGiaMax);
        }
    }
}
