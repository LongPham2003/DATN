package com.example.shoes.service.impl;

import com.example.shoes.entity.User;
import com.example.shoes.repository.UserRepository;
import com.example.shoes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return null;
    }

    @Override
    public User updateUser(User user) {
        return null;
    }

    @Override
    public void deleteUser(Integer id) {

    }
}
