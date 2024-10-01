package com.example.shoes.service;



import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.dto.kichthuoc.request.KichThuocRequest;
import com.example.shoes.dto.kichthuoc.response.KichThuocResponse;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface KichThuocService {
    List<KichThuocResponse> findAll();
    KichThuocResponse getById(Integer id);
    KichThuocResponse create(KichThuocRequest request);
    KichThuocResponse update(Integer id, KichThuocRequest request);
    void delete(Integer id);
    List<KichThuocResponse> search(String kichThuoc, Boolean trangThai);
}
