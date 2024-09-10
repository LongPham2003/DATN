package com.example.shoes.controller;

import com.example.shoes.dto.user.ApiResponse;
import com.example.shoes.dto.user.request.UserRequest;
import com.example.shoes.entity.User;
import com.example.shoes.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceImpl userService;

    @PostMapping("/add")
    ApiResponse<User> addUser(@Valid  @RequestBody UserRequest user) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.addUser(user));
        return apiResponse;
    }

    @PostMapping("/update/{id}")
    ApiResponse<Boolean> updateUser(@Valid @PathVariable Integer id, @RequestBody UserRequest user) {
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updateUser(id,user));
        return apiResponse;
    }

    @GetMapping("/getList")
    ApiResponse<List<User>> getUserList() {
        ApiResponse<List<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getAllUser());
        return apiResponse;
    }

}
