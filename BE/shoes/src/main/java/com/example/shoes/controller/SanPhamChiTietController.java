package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.KichThuocMauSacResponse;
import com.example.shoes.dto.sanphamchitiet.response.SPCTBanHangResponse;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietDetailResponse;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/sanphamchitiet")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;

    @GetMapping("/list/{id}")
    public ApiResponse<PhanTrangResponse<SanPhamChiTietResponse>> getAllChatLieu(
            @PathVariable("id") Integer idSanPham,
            @RequestParam(required = false) Integer idMauSac,
            @RequestParam(required = false) Integer idkichThuoc,
            @RequestParam(required = false) Integer idChatLieu,
            @RequestParam(required = false) Integer idThuongHieu,
            @RequestParam(required = false) Integer idDeGiay,
            @RequestParam(required = false) Boolean trangThai,
            @RequestParam(required = false) BigDecimal minDonGia,
            @RequestParam(required = false) BigDecimal maxDonGia,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<SanPhamChiTietResponse> sanPhamPhanTrangResponse = sanPhamChiTietService.getspctAndLocspct(
                idSanPham, idMauSac, idkichThuoc, idChatLieu, idThuongHieu, idDeGiay, trangThai, minDonGia, maxDonGia, pageNumber, pageSize);
        return ApiResponse.<PhanTrangResponse<SanPhamChiTietResponse>>builder()
                .result(sanPhamPhanTrangResponse)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SanPhamChiTietResponse> getById(@PathVariable Integer id) {
        SanPhamChiTietResponse sanPhamChiTietResponse = sanPhamChiTietService.getById(id);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(sanPhamChiTietResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<SanPhamChiTietResponse> create(@RequestBody SanPhamChiTietRequest request) {
        SanPhamChiTietResponse sanPhamChiTietResponse = sanPhamChiTietService.create(request);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(sanPhamChiTietResponse)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<SanPhamChiTietResponse> update(@PathVariable Integer id, @RequestBody SanPhamChiTietRequest request) {
        SanPhamChiTietResponse updated = sanPhamChiTietService.update(id, request);
        return ApiResponse.<SanPhamChiTietResponse>builder()
                .result(updated)
                .build();
    }

    @PutMapping("/updatetrangthai/{id}")
    public ApiResponse<Void> updateTrangThai(@PathVariable Integer id) {
        sanPhamChiTietService.updateTheoTrangThai(id);
        return ApiResponse.<Void>builder()
                .message("Update thành công")
                .build();
    }

    @GetMapping("/getidsanpham/{idsanpham}")
    public ApiResponse<List<SanPhamChiTietResponse>> findByIdSanPhamAndTrangThaiTrue(
            @PathVariable("idsanpham") Integer idSanPham) {
        List<SanPhamChiTietResponse> responses = sanPhamChiTietService.findByIdSanPhamAndTrangThaiTrue(idSanPham);
        // Trả về API response
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(responses)
                .build();
    }


    @GetMapping("/getallSPCTBH")
    public ApiResponse<List<SPCTBanHangResponse>> getAllSPCTBH(@RequestParam(required = false) String maSanPham,
                                                               @RequestParam(required = false) Integer idMauSac,
                                                               @RequestParam(required = false) Integer idkichThuoc,
                                                               @RequestParam(required = false) Integer idChatLieu,
                                                               @RequestParam(required = false) Integer idThuongHieu,
                                                               @RequestParam(required = false) Integer idDeGiay) {
        List<SPCTBanHangResponse> listSPCT = sanPhamChiTietService.getAllTrangThaitrue(maSanPham, idMauSac, idkichThuoc, idChatLieu, idThuongHieu, idDeGiay);
        return ApiResponse.<List<SPCTBanHangResponse>>builder().result(listSPCT).build();
    }



    @GetMapping("/getspctdetail/{idspct}")
    public ApiResponse<SanPhamChiTietDetailResponse> getSPCTDetail(@PathVariable Integer idspct) {
        SanPhamChiTietDetailResponse response = sanPhamChiTietService.getSPCTDetail(idspct);
        return ApiResponse.<SanPhamChiTietDetailResponse>builder().result(response).build();
    }

    @GetMapping("/loc")
    public ApiResponse<List<SanPhamChiTietResponse>> getKichThuocAndMauSacByTen(
            @RequestParam(value = "idSanPham", required = true) Integer idSanPham, // đảm bảo tham số là bắt buộc
            @RequestParam(value = "idKichThuoc", required = false) Integer idKichThuoc, // không bắt buộc
            @RequestParam(value = "idMauSac", required = false) Integer idMauSac // không bắt buộc
    ) {
        if (idSanPham == null) {
            throw new IllegalArgumentException("Tham số 'idSp' là bắt buộc");
        }
        List<SanPhamChiTietResponse> response = sanPhamChiTietService.getKichThuocAndMauSacByTen(idSanPham,idKichThuoc, idMauSac);
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(response)
                .build();
    }
    @GetMapping("/top3sanphammoinhat")
    public ApiResponse<List<SanPhamChiTietResponse>> top3SanPhamMoiNhat() {
        List<SanPhamChiTietResponse> responses = sanPhamChiTietService.findTop3SanPhamMoiNhat();
        // Trả về API response
        return ApiResponse.<List<SanPhamChiTietResponse>>builder()
                .result(responses)
                .build();
    }

}
