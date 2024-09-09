package com.example.shoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Role extends JpaRepository<com.example.shoes.entity.Role, Integer> {
}
