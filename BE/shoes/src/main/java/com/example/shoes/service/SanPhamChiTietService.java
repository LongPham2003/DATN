package com.example.shoes.service;
import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SPCTBanHangResponse;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietDetailResponse;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamChiTietService {
    PhanTrangResponse<SanPhamChiTietResponse> getspctAndLocspct(Integer idSanPham, Integer idMauSac, Integer idkichThuoc, Integer idChatLieu, Integer idThuongHieu, Integer idDeGiay,
                                                                Boolean trangThai, BigDecimal minDonGia, BigDecimal maxDonGia,int pageNumber, int pageSize);
    SanPhamChiTietResponse getById(Integer id);
    SanPhamChiTietResponse create(SanPhamChiTietRequest request);
    SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request);
    Page<SPCTBanHangResponse> getAllTrangThaitrue(String maSanPham,
                                                  Integer idMauSac,
                                                  Integer idkichThuoc,
                                                  Integer idChatLieu,
                                                  Integer idThuongHieu,
                                                  Integer idDeGiay,
                                                  Pageable pageable);
    void updateTheoTrangThai(Integer id);
    List<SanPhamChiTietResponse> findByIdSanPhamAndTrangThaiTrue( Integer idSanPham);
    SanPhamChiTietDetailResponse getSPCTDetail(Integer idSPCT);
}
