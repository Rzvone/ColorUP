package com.codecool.colorup.service;

import com.codecool.colorup.DTOS.ProductCartDTO;
import com.codecool.colorup.model.Cart;
import com.codecool.colorup.model.Product;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.CartRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service(value = "cartService")
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ProductService productService, UserService userService) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public void addToCart(Long userId, ProductCartDTO productCartDTO) {
        User user = userService.getUserById(userId);
        Product product = productService.findById(productCartDTO.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Cart cart = user.getCart();
        Map<Product, Integer> productQuantityMap = cart.getProductQuantityMap();
        productQuantityMap.put(product, productQuantityMap.getOrDefault(product, 0) + productCartDTO.getQuantity());
        cart.setProductQuantityMap(productQuantityMap);
        cartRepository.save(cart);
    }
}
