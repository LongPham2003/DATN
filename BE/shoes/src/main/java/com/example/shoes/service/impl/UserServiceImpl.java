package com.example.shoes.service.impl;

import com.example.shoes.dto.user.request.UserRequest;
import com.example.shoes.entity.User;
import com.example.shoes.enums.Role;
import com.example.shoes.exception.AppException;
import com.example.shoes.exception.ErrorCode;
import com.example.shoes.repository.UserRepository;
import com.example.shoes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User addUser(UserRequest userCreationRequest) {
        if(userRepository.existsByEmail(userCreationRequest.getEmail())){
            throw new AppException(ErrorCode.USER_EXISTS);
        }
        User user = new User();
        user.setFullName(userCreationRequest.getFullName());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));

        user.setEmail(userCreationRequest.getEmail());
        user.setBirthday(userCreationRequest.getBirthday());
        user.setGender(userCreationRequest.getGender());
        user.setAddress(userCreationRequest.getAddress());
        user.setPhone(userCreationRequest.getPhone());

        HashSet<String>  roles = new HashSet();
        roles.add(Role.USER.name());

//        user.setRoles(roles);

        user.setStatus(true);
        return userRepository.save(user);
    }

    @Override
    public Boolean updateUser(Integer id ,UserRequest userUpdate) {



        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setFullName(userUpdate.getFullName());
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            user.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
            user.setEmail(userUpdate.getEmail());
            user.setBirthday(userUpdate.getBirthday());
            user.setGender(userUpdate.getGender());
            user.setAddress(userUpdate.getAddress());
            user.setRoles(userUpdate.getRoles());
            user.setPhone(userUpdate.getPhone());
            user.setStatus(userUpdate.isStatus());
            userRepository.save(user);
            return true;
        }else {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
    }

    @Override
    public void deleteUser(Integer id) {

    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
