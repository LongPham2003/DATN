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

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 20)
    @NotNull
    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @NotNull
    @Lob
    @Column(name = "shipping_address", nullable = false)
    private String shippingAddress;

    @Lob
    @Column(name = "notes")
    private String notes;

    @NotNull
    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @ColumnDefault("0.00")
    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @ColumnDefault("0.00")
    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount;

    @NotNull
    @Column(name = "delivery_date", nullable = false)
    private LocalDate deliveryDate;

    @Size(max = 50)
    @Column(name = "status", length = 50)
    private String status;

}