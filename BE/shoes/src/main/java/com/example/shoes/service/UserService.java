package com.example.shoes.service;

import com.example.shoes.entity.User;

public interface UserService {
    User addUser(User user);
    User updateUser(User user);
    void deleteUser(Integer id);
}
