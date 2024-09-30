package com.example.shoes.service.impl;

import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.ChatLieuRepo;
import com.example.shoes.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class ChatLieuServiceImpl implements ChatLieuService {

    @Autowired
    private ChatLieuRepo chatLieuRepo;


    @Override
    public List<ChatLieuResponse> findAll() {
        return chatLieuRepo.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ChatLieuResponse getById(Integer id) {
        ChatLieu chatLieu = chatLieuRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));
        return convertToResponse(chatLieu);
    }

    @Override
    public ChatLieuResponse create(ChatLieuRequest request) {
        ChatLieu chatLieu = new ChatLieu();
        chatLieu.setTen(request.getTen());
        chatLieu.setTrangThai(request.getTrangThai());
        ChatLieu savedChatLieu = chatLieuRepo.save(chatLieu);
        return convertToResponse(savedChatLieu);
    }

    @Override
    public ChatLieuResponse update(Integer id, ChatLieuRequest request) {
        ChatLieu chatLieu = chatLieuRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));
        chatLieu.setTen(request.getTen());
        chatLieu.setTrangThai(request.getTrangThai());
        ChatLieu updatedChatLieu = chatLieuRepo.save(chatLieu);
        return convertToResponse(updatedChatLieu);
    }

    @Override
    public void delete(Integer id) {
        if (!chatLieuRepo.existsById(id)) {
            throw new AppException(ErrorCode.MATERIAL_NOT_FOUND);
        }
        chatLieuRepo.deleteById(id);
    }

    private ChatLieuResponse convertToResponse(ChatLieu chatLieu) {
        ChatLieuResponse chatLieuResponse = new ChatLieuResponse();
        chatLieuResponse.setId(chatLieu.getId());
        chatLieuResponse.setTen(chatLieu.getTen());
        chatLieuResponse.setTrangThai(chatLieu.getTrangThai());
        return chatLieuResponse;
    }
}
