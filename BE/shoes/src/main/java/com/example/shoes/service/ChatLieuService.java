package com.example.shoes.service;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.entity.ChatLieu;


import java.util.List;

public interface ChatLieuService {
    PhanTrangResponse<ChatLieu> getChatLieu(int pageNumber, int pageSize, String keyword);
    ChatLieuResponse getById(Integer id);
    ChatLieuResponse create(ChatLieuRequest request);
    ChatLieuResponse update(Integer id, ChatLieuRequest request);
    void delete(Integer id);
    List<ChatLieuResponse> searchChatLieu(String ten, Boolean trangThai);
    List<String> getAllTenChatLieu();
}
