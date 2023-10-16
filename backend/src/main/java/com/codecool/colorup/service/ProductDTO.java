package com.codecool.colorup.service;

import lombok.Data;


@Data
public class ProductDTO {
    private String name;
    private String description;
    private String category;
    private Double price;
}
