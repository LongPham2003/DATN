package com.example.shoes.service;

import com.example.shoes.dto.user.request.UserRequest;
import com.example.shoes.entity.User;

import java.util.List;

public interface UserService {

    User addUser(UserRequest userRequest);
    Boolean updateUser(Integer id, UserRequest userRequest);
    void deleteUser(Integer id);
    List<User> getAllUser();

}
