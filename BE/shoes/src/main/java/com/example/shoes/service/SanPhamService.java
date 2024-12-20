package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.request.LocSanPham;
import com.example.shoes.dto.sanpham.request.SanPhamRequest;
import com.example.shoes.dto.sanpham.response.SanPhamBanChayResponse;
import com.example.shoes.dto.sanpham.response.SanPhamClient;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamService
{
    PhanTrangResponse<SanPhamClient> sanPhamClient(int pageNumber, int pageSize, String tenSP,
            List<Integer> idLoai, List<Integer> idKichThuoc,
            List<Integer> idMauSac, List<Integer> idDeGiay, List<Integer> idChatLieu, List<Integer> idThuongHieu,
            BigDecimal donGiaMin, BigDecimal donGiaMax);

    PhanTrangResponse<SanPhamResponse> getSanPham(int pageNumber, int pageSize, String keyword, Integer idLoai,
            Boolean trangThai);

    SanPhamResponse getById(Integer id);

    SanPhamResponse create(SanPhamRequest request);

    SanPhamResponse update(Integer id, SanPhamRequest request);

    List<SanPhamResponse> getAll();

    void updateTheoTrangThai(Integer id);

    List<String> getAlltenSP();

    List<SanPhamBanChayResponse> getTop3SanPhamBanChay();

    SanPhamClient sanPhamTrangChiTietClient(Integer idSP);

    PhanTrangResponse<SanPhamClient> sanPhamClient(String tenSP, List<Integer> idLoai, List<Integer> idKichThuoc,
            List<Integer> idMauSac, List<Integer> idDeGiay, List<Integer> idChatLieu, List<Integer> idThuongHieu,
            BigDecimal donGiaMin, BigDecimal donGiaMax,int pageNumber, int pageSize);

    PhanTrangResponse<SanPhamResponse> finAll(int pageNumber, int pageSize, String tenSP, List<Integer> idLoai,
            List<Integer> idKichThuoc, List<Integer> idMauSac, List<Integer> idDeGiay, List<Integer> idChatLieu,
            List<Integer> idThuongHieu, BigDecimal donGiaMin, BigDecimal donGiaMax);

}
