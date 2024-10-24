package com.example.shoes.service;



import com.example.shoes.dto.hinhanh.repuest.HinhAnhRequest;
import com.example.shoes.dto.hinhanh.response.HinhAnhResponse;

import java.util.List;
import java.util.Optional;

public interface HinhAnhService {
    List<HinhAnhResponse> findAll();
    HinhAnhResponse getById(Integer id);
    HinhAnhResponse create(HinhAnhRequest request);
    HinhAnhResponse update(Integer id, HinhAnhRequest request);
    void delete(Integer id);
    HinhAnhResponse getFirstBySanPhamChiTietId(Integer idSanPhamChiTiet);
    List<HinhAnhResponse> getAllHinhAnhTheoIDSPCT(Integer idSanPhamChiTiet);

}
