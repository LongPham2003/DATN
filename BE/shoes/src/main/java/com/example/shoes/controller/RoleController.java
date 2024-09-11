package com.example.shoes.controller;

import com.example.shoes.dto.ApiResponse;
import com.example.shoes.entity.Role;
import com.example.shoes.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/role")
@RestController
public class RoleController {
    @Autowired
    RoleService roleService;

    @PostMapping("/add")
    ApiResponse add(@RequestBody Role role) {
        return ApiResponse.<Role>builder()
                .code(1000)
                .result(roleService.addRole(role))
                .build();
    }

}
