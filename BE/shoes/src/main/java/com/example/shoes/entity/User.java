package com.example.shoes.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")

@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String name;
    String password;
    String email;
    String phone;
    String address;
    @Temporal(TemporalType.DATE)
    LocalDate birthday;
    String gender;
    String verificationCode;
    String image;
    boolean enabled;
    @ManyToMany
    private Set<Role> roles;
}
