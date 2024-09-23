package com.example.shoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "de_giay")
public class DeGiay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "ten", nullable = false)
    private String ten;

    @NotNull
    @Column(name = "trang_thai", nullable = false)
    private Boolean trangThai = false;

}