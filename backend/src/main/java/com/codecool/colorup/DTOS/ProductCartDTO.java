package com.codecool.colorup.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCartDTO {
    private Long productId;
    private String productName; // You can include other product details you need
    private int quantity;
}
