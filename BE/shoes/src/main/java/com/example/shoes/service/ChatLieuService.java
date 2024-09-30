package com.example.shoes.service;

import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;

import java.util.List;

public interface ChatLieuService {
    List<ChatLieuResponse> findAll();
    ChatLieuResponse getById(Integer id);
    ChatLieuResponse create(ChatLieuRequest request);
    ChatLieuResponse update(Integer id, ChatLieuRequest request);
    void delete(Integer id);
}
