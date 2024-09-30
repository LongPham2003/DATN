package com.example.shoes.controller;

import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chatlieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;
    @GetMapping("/list")
    public ApiResponse<List<ChatLieuResponse>> getAllChatLieu() {
        List<ChatLieuResponse> chatLieuResponses = chatLieuService.findAll();
        return ApiResponse.<List<ChatLieuResponse>>builder()
                .result(chatLieuResponses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ChatLieuResponse> getChatLieuById(@PathVariable Integer id) {
        ChatLieuResponse chatLieuResponse = chatLieuService.getById(id);
        return ApiResponse.<ChatLieuResponse>builder()
                .result(chatLieuResponse)
                .build();
    }


    @PostMapping("/add")
    public ApiResponse<ChatLieuResponse> createChatLieu(@RequestBody ChatLieuRequest request) {
        ChatLieuResponse newChatLieu = chatLieuService.create(request);
        return ApiResponse.<ChatLieuResponse>builder()
                .result(newChatLieu)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<ChatLieuResponse> updateChatLieu(@PathVariable Integer id, @RequestBody ChatLieuRequest request) {
        ChatLieuResponse updatedChatLieu = chatLieuService.update(id, request);
        return ApiResponse.<ChatLieuResponse>builder()
                .result(updatedChatLieu)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> deleteChatLieu(@PathVariable Integer id) {
        chatLieuService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa chất liệu thành công")
                .build();
    }
}
