package com.example.shoes.controller;

import com.example.shoes.dto.ApiResponse;
import com.example.shoes.dto.user.request.UserRequest;
import com.example.shoes.entity.User;
import com.example.shoes.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    UserServiceImpl userService;

    @PostMapping("/add")
    ApiResponse<User> addUser(@Valid  @RequestBody UserRequest user) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.addUser(user));
        return apiResponse;
    }

    @PostMapping("/update/{id}")
    ApiResponse<Boolean> updateUser(@Valid  @RequestBody UserRequest user,@PathVariable Integer id) {
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updateUser(id,user));
        return apiResponse;
    }
    @PreAuthorize("hasRole('ADMIN')") // kiểm tra role trước khi gọi method
    @GetMapping("/getList")
    ApiResponse<List<User>> getUserList() {
        var authenticate = SecurityContextHolder.getContext().getAuthentication();
        if (authenticate != null) {
            System.out.println("Authenticated user: " + authenticate.getName());
        } else {
            System.out.println("No user is authenticated.");
        }

        System.out.println("authenticated user: " + authenticate.getAuthorities());
        ApiResponse<List<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getAllUser());
        return apiResponse;
    }

}
