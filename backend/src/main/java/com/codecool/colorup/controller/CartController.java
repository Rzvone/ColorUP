package com.codecool.colorup.controller;

import com.codecool.colorup.DTOS.CartPageDTO;
import com.codecool.colorup.DTOS.ProductCartDTO;
import com.codecool.colorup.DTOS.ProductResponseDTO;
import com.codecool.colorup.DTOS.UpdateCartDTO;
import com.codecool.colorup.error.CustomErrorResponse;
import com.codecool.colorup.model.Cart;
import com.codecool.colorup.model.User;
import com.codecool.colorup.service.CartService;
import com.codecool.colorup.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final UserService userService;

    @Autowired
    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @CrossOrigin("*")
    @PutMapping("/add/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody ProductCartDTO productCartDTO){
        try {
            cartService.addToCart(userId, productCartDTO);
            User updatedUser = userService.getUserById(userId);
            return ResponseEntity.ok(new ProductResponseDTO(updatedUser, "Product added successfully!"));
        }catch (EntityNotFoundException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND, "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @CrossOrigin("*")
    @PatchMapping("/update/{userId}")
    public ResponseEntity<?> updateCart(@PathVariable Long userId, @RequestBody UpdateCartDTO updateCartDTO){
        try{
            cartService.updateCart(userId,updateCartDTO);
            User updatedUser = userService.getUserById(userId);
            return ResponseEntity.ok(new ProductResponseDTO(updatedUser, "Cart update successfully!"));
        }catch (EntityNotFoundException e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.NOT_FOUND, "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            CustomErrorResponse errorResponse = new CustomErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/getCart/{userId}")
    @CrossOrigin("*")
    public List<CartPageDTO> getCart(@PathVariable Long userId){
        return cartService.getCartByUserId(userId);
    }
}
