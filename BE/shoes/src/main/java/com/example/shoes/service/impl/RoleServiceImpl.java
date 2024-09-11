package com.example.shoes.service.impl;

import com.example.shoes.entity.Role;
import com.example.shoes.repository.RoleRepository;
import com.example.shoes.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role updateRole(Role role) {
        return null;
    }

    @Override
    public Role deleteRole(Integer idRole) {
        return null;
    }

    @Override
    public List<Role> getAllRoles() {
        return List.of();
    }
}
