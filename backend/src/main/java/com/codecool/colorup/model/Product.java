package com.codecool.colorup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import java.util.Objects;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "product_name", nullable = false)
    private String name;

    @Column(name = "product_category", nullable = false)
    private String category;

    @Column(name = "product_description", nullable = false)
    private String description;

    @Column(name = "product_in_stock",nullable = false)
    private int stock;

    @Column(name = "product_price", nullable = false)
    @Min(value = 0, message = "Price must be positive")
    private Double price;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        return id.equals(product.id);
    }


    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
