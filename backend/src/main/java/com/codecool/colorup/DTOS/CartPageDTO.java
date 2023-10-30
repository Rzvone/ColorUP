package com.codecool.colorup.DTOS;

import com.codecool.colorup.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartPageDTO {
    private Product product;
    private int quantity;
    private String image;
}
