package com.example.shoes.entity;

import com.example.shoes.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder

@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "full_name")

    String fullName;
    @Column(name = "password")
    @Size(min = 8, message = "Password phải lớn hơn 8 kí tự")
    String password;
    @Column(name = "email")
    String email;
    @Column(name = "phone_number")
    String phone;
    @Column(name = "address")
    String address;
    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    LocalDate birthday;
    @Column(name = "gender")
    String gender;
    String verificationCode;
    @Column(name = "image")
    String image;
    @Column(name = "status")
    boolean status;


    @Enumerated(EnumType.STRING)
    Role roles;

}