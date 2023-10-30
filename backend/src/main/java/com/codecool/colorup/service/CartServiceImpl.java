package com.codecool.colorup.service;

import com.codecool.colorup.DTOS.CartPageDTO;
import com.codecool.colorup.DTOS.ProductCartDTO;
import com.codecool.colorup.model.Cart;
import com.codecool.colorup.model.Product;
import com.codecool.colorup.model.User;
import com.codecool.colorup.repository.CartRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

        // Update the quantity in the productQuantityMap
        int newQuantity = productQuantityMap.getOrDefault(product, 0) + productCartDTO.getQuantity();
        productQuantityMap.put(product, newQuantity);

        // Update the price based on the products' price and quantity
        double totalCartPrice = calculateTotalCartPrice(productQuantityMap);
        cart.setPrice(totalCartPrice);

        // Save the updated cart
        cartRepository.save(cart);
    }
    private double calculateTotalCartPrice(Map<Product, Integer> productQuantityMap) {
        double totalPrice = 0.0;
        for (Map.Entry<Product, Integer> entry : productQuantityMap.entrySet()) {
            Product product = entry.getKey();
            int quantity = entry.getValue();
            double productPrice = product.getPrice();
            totalPrice += productPrice * quantity;
        }
        return totalPrice;
    }

    @Override
    public int getTotalQuantityInCart(Cart cart) {
        Map<Product, Integer> productQuantityMap = cart.getProductQuantityMap();
        int totalQuantity = 0;

        for (Integer quantity : productQuantityMap.values()) {
            totalQuantity += quantity;
        }

        return totalQuantity;
    }


    @Override
    public List<CartPageDTO> getCartByUserId(Long id) {
        Cart cart = cartRepository.getCartByUserId(id);
        List<CartPageDTO> productList = new ArrayList<>();

        Map<Product, Integer> productQuantityMap = cart.getProductQuantityMap();

        for (Map.Entry<Product, Integer> entry : productQuantityMap.entrySet()) {
            Product product = entry.getKey();
            Integer quantity = entry.getValue();
            String imageUrl = productService.imageToDataUrl(productService.loadImageForProduct(product));
            productList.add(new CartPageDTO(product, quantity, imageUrl));
        }

        return productList;
    }

}
