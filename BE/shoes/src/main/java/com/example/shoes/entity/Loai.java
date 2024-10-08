package com.example.shoes.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@Entity
@Table(name = "loai")
@NoArgsConstructor
@AllArgsConstructor
public class Loai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "ten")
    private String ten;

    @NotNull
    @Column(name = "trang_thai")
    private Boolean trangThai;
}