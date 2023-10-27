package com.codecool.colorup.service;

import lombok.Data;


@Data
public class ProductDTO {
    private String name;
    private String description;
    private int stock;
    private String category;
    private Double price;
}
