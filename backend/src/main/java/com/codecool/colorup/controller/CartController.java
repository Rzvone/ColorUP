package com.codecool.colorup.controller;

import com.codecool.colorup.DTOS.ProductCartDTO;
import com.codecool.colorup.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @CrossOrigin("*")
    @PutMapping("/add/{userId}")
    public void addToCart(@PathVariable Long userId, @RequestBody ProductCartDTO productCartDTO){
        cartService.addToCart(userId,productCartDTO);
    }
}
