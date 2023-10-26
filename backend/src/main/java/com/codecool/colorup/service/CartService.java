package com.codecool.colorup.service;

import com.codecool.colorup.DTOS.ProductCartDTO;

public interface CartService {
    void addToCart(Long userId, ProductCartDTO productCartDTO);
}
