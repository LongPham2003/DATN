package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatlieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;
    @GetMapping("/list")
    public ApiResponse<PhanTrangResponse<ChatLieu>> getAllChatLieu(
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {
        PhanTrangResponse<ChatLieu> chatLieuResponses = chatLieuService.getChatLieu(pageNumber, pageSize, keyword);
        return ApiResponse.<PhanTrangResponse<ChatLieu>>builder()
                .result(chatLieuResponses)
                .build();
    }

//    @GetMapping("/ten")
//    public ApiResponse<PhanTrangResponse<List<String>>> getTenChatLieu() {
//        List<String> allTen = chatLieuService.getAllTenChatLieu();
//        return ApiResponse.<allTen>builder().build();
//    }
    @GetMapping("/ten")
    public ResponseEntity<List<String>> getAllTen(){
        List<String> listTen = chatLieuService.getAllTenChatLieu();
        return ResponseEntity.ok(listTen);
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
