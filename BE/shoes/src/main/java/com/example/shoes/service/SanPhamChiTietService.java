package com.example.shoes.service;
import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.sanphamchitiet.request.SanPhamChiTietRequest;
import com.example.shoes.dto.sanphamchitiet.response.SanPhamChiTietResponse;
import java.math.BigDecimal;
import java.util.List;

public interface SanPhamChiTietService {
    PhanTrangResponse<SanPhamChiTietResponse> getspctAndLocspct(Integer idSanPham, Integer idMauSac, Integer idkichThuoc, Integer idChatLieu, Integer idThuongHieu, Integer idDeGiay,
                                                                Boolean trangThai, BigDecimal minDonGia, BigDecimal maxDonGia,int pageNumber, int pageSize);
    SanPhamChiTietResponse getById(Integer id);
    SanPhamChiTietResponse create(SanPhamChiTietRequest request);
    SanPhamChiTietResponse update(Integer id, SanPhamChiTietRequest request);
    List<SanPhamChiTietResponse> getAll();
    void updateTheoTrangThai(Integer id);
    List<SanPhamChiTietResponse> findByIdSanPhamAndTrangThaiTrue( Integer idSanPham);

    List<SanPhamChiTietResponse> getAlLByIdSanPham(Integer idSanPham, Integer idMauSac, Integer idkichThuoc, Integer idChatLieu, Integer idThuongHieu, Integer idDeGiay,
                                                   Boolean trangThai, BigDecimal minDonGia, BigDecimal maxDonGia);
}
