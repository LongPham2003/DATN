package com.example.shoes.controller;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.exception.ApiResponse;
import com.example.shoes.service.ChatLieuService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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

    //Trang Thai true
    @GetMapping("/getall")
    public ApiResponse<List<ChatLieuResponse>> getAll() {
        // Gọi hàm getAllChatLieu() để lấy danh sách các ChatLieuResponse
        List<ChatLieuResponse> chatLieuResponses = chatLieuService.getAllChatLieu();

        // Tạo đối tượng ApiResponse để trả về danh sách ChatLieuResponse
        return ApiResponse.<List<ChatLieuResponse>>builder()
                .result(chatLieuResponses)
                .build();
    }
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
    public ApiResponse<ChatLieuResponse> createChatLieu(@Valid @RequestBody ChatLieuRequest request, BindingResult result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getFieldError().getDefaultMessage());
        }
        ChatLieuResponse newChatLieu = chatLieuService.create(request);
        return ApiResponse.<ChatLieuResponse>builder()
                .result(newChatLieu)
                .message("Thêm thành công")
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<ChatLieuResponse> updateChatLieu(@Valid @PathVariable Integer id, @RequestBody ChatLieuRequest request,BindingResult result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getFieldError().getDefaultMessage());
        }
        ChatLieuResponse updatedChatLieu = chatLieuService.update(id, request);
        return ApiResponse.<ChatLieuResponse>builder()
                .result(updatedChatLieu)
                .message("cập nhận thành công ")
                .build();
    }

    @PutMapping ("/updatetrangthai/{id}")
    public ApiResponse<Void> deleteChatLieu(@PathVariable Integer id) {
        chatLieuService.delete(id);
        return ApiResponse.<Void>builder()
                .build();
    }
}
