package com.example.shoes.service.impl;

import com.example.shoes.dto.PhanTrangResponse;
import com.example.shoes.dto.chatlieu.request.ChatLieuRequest;
import com.example.shoes.dto.chatlieu.response.ChatLieuResponse;
import com.example.shoes.entity.ChatLieu;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.ChatLieuRepo;
import com.example.shoes.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatLieuServiceImpl implements ChatLieuService {

    @Autowired
 private ChatLieuRepo chatLieuRepo;

    @Override
    public PhanTrangResponse<ChatLieu> getChatLieu(int pageNumber, int pageSize, String keyword) {
        // Tạo đối tượng Pageable với số trang và kích thước trang
        Pageable pageable = PageRequest.of(pageNumber-1, pageSize);
        // Lấy danh sách  từ repo
        Page<ChatLieu> page = chatLieuRepo.getChatLieu(pageable, keyword);
        // Tạo đối tượng PhanTrangResponse để trả về kết quả
        PhanTrangResponse<ChatLieu> phanTrangResponse = new PhanTrangResponse<>();
        phanTrangResponse.setPageNumber(page.getNumber());
        phanTrangResponse.setPageSize(page.getSize());
        phanTrangResponse.setTotalElements(page.getTotalElements());
        phanTrangResponse.setTotalPages(page.getTotalPages());
        phanTrangResponse.setResult(page.getContent());
        return phanTrangResponse;
    }
    // Phương thức lấy  theo id
    @Override
    public ChatLieuResponse getById(Integer id) {
        ChatLieu chatLieu = chatLieuRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));
        return convertToResponse(chatLieu);
    }
    // Phương thức thêm moi
    @Override
    public ChatLieuResponse create(ChatLieuRequest request) {
        if(chatLieuRepo.existsByTen(request.getTen())){
            throw new AppException(ErrorCode.ATTRIBUTE_EXISTED);
        }
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

        ChatLieu chatLieu=chatLieuRepo.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));
        if(chatLieu.getTrangThai()==true){
            chatLieu.setTrangThai(false);
        }else {
            chatLieu.setTrangThai(true);
        }
        chatLieuRepo.save(chatLieu);
    }
// phương thức tim kiem theo ten va trang thai
    @Override
    public List<ChatLieuResponse> searchChatLieu(String ten, Boolean trangThai) {
        List<ChatLieu> chatLieuList;

        if (ten != null && trangThai != null) {
            chatLieuList = chatLieuRepo.findByTenContainingIgnoreCaseAndTrangThai(ten, trangThai);
        } else if (ten != null) {
            chatLieuList = chatLieuRepo.findByTenContainingIgnoreCase(ten);
        } else if (trangThai != null) {
            chatLieuList = chatLieuRepo.findByTrangThai(trangThai);
        } else {
            chatLieuList = chatLieuRepo.findAll();
        }
    // Chuyển đổi danh sách  thành danh sách ChatLieuResponse
        return chatLieuList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllTenChatLieu() {
        return chatLieuRepo.findAll().stream().map(ChatLieu::getTen).collect(Collectors.toList());
    }

    @Override
    public List<ChatLieuResponse> getAllChatLieu() {
        // Lấy tất cả các ChatLieu từ repository
        List<ChatLieu> chatLieuList = chatLieuRepo.findAll();
        // Chuyển đổi từ ChatLieu sang ChatLieuResponse
        return chatLieuList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // Phương thức chuyển đổi ChatLieu thành ChatLieuResponse
    private ChatLieuResponse convertToResponse(ChatLieu chatLieu) {
        ChatLieuResponse chatLieuResponse = new ChatLieuResponse();
        chatLieuResponse.setId(chatLieu.getId());
        chatLieuResponse.setTen(chatLieu.getTen());
        chatLieuResponse.setTrangThai(chatLieu.getTrangThai());
        return chatLieuResponse;
    }
}
