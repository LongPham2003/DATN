package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanpham.response.SanPhamResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import com.example.shoes.entity.SanPham;
import com.example.shoes.entity.SanPhamChiTiet;
import com.example.shoes.repository.SanPhamChiTietRepo;
import com.example.shoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {
    @Autowired
    private SanPhamChiTietRepo sanPhamChiTietRepo;


    @Override
    public PhanTrangResponse<SanPhamChiTietResponse> getSanPhamChiTiet(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize); // Chuyển đổi sang zero-based page
        Page<SanPhamChiTiet> page = sanPhamChiTietRepo.getSanPham(pageable);

        // Chuyển đổi từng đối tượng SanPham trong page sang SanPhamResponse
        List<SanPhamChiTietResponse> sanPhamChiTietResponses = page.getContent().stream()
                .map(this::converToResponse)
                .collect(Collectors.toList());

        PhanTrangResponse<SanPhamChiTietResponse> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber() + 1);
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(sanPhamChiTietResponses);
        return phanTrangResponse;
    }

    @Override
    public SanPhamChiTietResponse getById(Integer id) {
        return null;
    }

    @Override
    public SanPhamChiTietResponse create(SanPhamChiTietRequest request) {
        return null;
    }

    @Override
    public SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request) {
        return null;
    }
    private SanPhamChiTietResponse converToResponse(SanPhamChiTiet sanPhamChiTiet) {
        SanPhamChiTietResponse response = new SanPhamChiTietResponse();
        response.setId(sanPhamChiTiet.getId());
        response.setTenSanPham(sanPhamChiTiet.getIdSanPham().getTenSanPham());
        response.setChatLieu(sanPhamChiTiet.getIdChatLieu().getTen());
        response.setMauSac(sanPhamChiTiet.getIdMauSac().getTen());
        response.setKichThuoc(sanPhamChiTiet.getIdKichThuoc().getKichThuoc());
        response.setThuongHieu(sanPhamChiTiet.getIdThuongHieu().getTen());
        response.setDeGiay(sanPhamChiTiet.getIdDeGiay().getTen());
        response.setDonGia(sanPhamChiTiet.getDonGia());
        response.setSoLuong(sanPhamChiTiet.getSoLuong());
        response.setTrangThai(sanPhamChiTiet.getTrangThai());
        return response;

        }
}
