package com.example.shoes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "fullName", nullable = false)
    private String fullName;

    @NotNull
    @Lob
    @Column(name = "address", nullable = false)
    private String address;

    @Size(max = 20)
    @NotNull
    @Column(name = "phoneNumber", nullable = false, length = 20)
    private String phoneNumber;

    @NotNull
    @Column(name = "dateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @Size(max = 10)
    @ColumnDefault("''")
    @Column(name = "gender", length = 10)
    private String gender;

    @Size(max = 255)
    @Column(name = "email")
    private String email;

    @Size(max = 255)
    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @ColumnDefault("1")
    @Column(name = "status")
    private Boolean status;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

}