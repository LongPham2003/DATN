package com.example.shoes.service;

import com.example.shoes.entity.Role;

import java.util.List;

public interface RoleService {
    Role addRole(Role role);
    Role updateRole(Role role);
    Role deleteRole(Integer idRole);
    List<Role> getAllRoles();
}
